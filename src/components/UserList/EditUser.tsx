import { useRef, useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import MuiAlert from "@mui/material/Alert";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Select from "@mui/material/Select";
import { useParams } from "react-router-dom";
import * as Agent from "../../services/ConnectionsServices";

function Alert(props: any) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const initialUserValue = {
  Last_Act_Dt: null,
  Last_Change_Info_Dt: "",
  Login: "",
  Prof_Prefix: null,
  Role_Id: null,
  Usr_Id: null,
  Usr_Name: "",
  Usr_State: "OFF",
};

export const EditUser = () => {
const { id: UserId } = useParams<{id: string}>();

  const localStorageusrToken: string | undefined | null =
    sessionStorage.getItem("_usrToken");
  const [userData, setUserData] = useState(initialUserValue);
  const [usrName, setUsrName] = useState("");
  const [role, setRole] = useState(4);

  const [isPending, setIsPending] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [open, setOpen] = useState(false);
  const [resultMessage, setResultMessage] = useState("");
  const [resultStatus, setResultStatus] = useState("success");
  const [switchStatus, setSwitchStatus] = useState(false);
  const refUsername = useRef("");

  useEffect(() => {
    if (!!UserId && localStorageusrToken && userData.Usr_Name === "") {
      getUserData(localStorageusrToken, UserId);
    }
    setIsPending(false);
  });

  const getUserData = (token: string, userId: string | number) => {
    Agent.User.getOne(userId, token)
      .then((res) => {
        setUserData(res);
        setSwitchStatus(res.Usr_State === "ON");
        setUsrName(res.Usr_Name);
        setRole(res.Role_Id);
      })
      .catch((err: any) => {
        alertSet(
          err.resultMessage ? err.resultMessage : "Неизвестная ошибка",
          "error"
        );
      })
      .finally(() => {
        setIsPending(false);
      });
  };

  const alertSet = (msg: string, status: "success" | "warning" | "error") => {
    setResultMessage(msg);
    setResultStatus(status);
    handleClick();
  };

  const submitUser = () => {
    setIsPending(true);

    if (!!UserId && localStorageusrToken !== null) {
      const data = {
        Role_Id: role,
        State: switchStatus ? "ON" : "OFF",
        Usr_Name: usrName,
        Usr_Id: UserId,
        _usrToken: localStorageusrToken,
      };

      Agent.User.edit(data)
        .then((res) => {
          const { ResultCode, ResultMessage } = res;
          let status: "success" | "warning" | "error" = "success";

          if (ResultCode && ResultCode !== 0) {
            status = "warning";
          }

          alertSet(ResultMessage, status);
        })
        .then(() => {
          if (!!UserId && localStorageusrToken) {
            getUserData(localStorageusrToken, UserId);
          }
        })
        .catch((err: any) => {
          alertSet(
            err.resultMessage ? err.resultMessage : "Неизвестная ошибка",
            "error"
          );
        })
        .finally(() => {
          setIsPending(false);
        });
    }
    setIsPending(false);
  };

  const usrNameHandler = (e: any) => {
    setUsrName(e.target.value);
    if (e.target.value === "") {
      setIsEmpty(true);
    } else setIsEmpty(false);
  };
  const roleHandler = (e: any) => {
    setRole(e.target.value);
  };

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event: any, reason: any) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleSwitchChange = (e: any) => {
    setSwitchStatus(e.target.checked);
  };

  return (
    <div className="MuiCardContent-root">
      <div className="ra-input">
        <div className="MuiFormControl-root MuiTextField-root RaFormInput-input-54 MuiFormControl-marginDense">
          <div>Логин</div>
          <h4>{userData.Login}</h4>
        </div>
      </div>

      <div className="ra-input">
        <div
          className="MuiFormControl-root MuiTextField-root RaFormInput-input-54 MuiFormControl-marginDense"
          style={{ width: "100%" }}
        >
          <TextField
            disabled={isPending}
            type="text"
            inputRef={refUsername}
            name="Usr_Name"
            value={usrName}
            onChange={usrNameHandler}
            label="Имя пользователя"
            autoComplete="new-password"
            style={{ width: "100%" }}
          />
        </div>
      </div>

      <div className="ra-input">
        <div className="MuiFormControl-root MuiTextField-root RaFormInput-input-54 MuiFormControl-marginDense">
          <div>
            <br />
            Роль пользователя
          </div>
          <Select labelId="Роль" value={role} onChange={roleHandler}>
            <MenuItem value={1}>SysAdmin</MenuItem>
            <MenuItem value={2}>Бизнес-администратор</MenuItem>
            <MenuItem value={3}>Супервизор UNNIT</MenuItem>
            <MenuItem value={4}>Исполнитель Услуги</MenuItem>
            <MenuItem value={5}>Табло</MenuItem>
          </Select>
        </div>
      </div>
      <div className="ra-input">
        <div className="MuiFormControl-root MuiTextField-root RaFormInput-input-54 MuiFormControl-marginDense">
          <FormControlLabel
            control={
              <Switch
                id={`${UserId}`}
                checked={switchStatus}
                onChange={handleSwitchChange}
              />
            }
            label={`пользователь ${switchStatus ? "" : "не"}активен`}
          />
        </div>
      </div>
      <div className="ra-input">
        <Button
          disabled={isPending || isEmpty}
          color="secondary"
          variant="contained"
          onClick={submitUser}
        >
          Обновить данные пользователя
        </Button>
      </div>
      <hr />
      {open && (
        <Alert onClose={handleClose} severity={resultStatus}>
          {resultMessage}
        </Alert>
      )}
    </div>
  );
};
