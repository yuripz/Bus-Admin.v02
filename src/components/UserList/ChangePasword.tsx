import { useRef, useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import * as Agent from "../../services/ConnectionsServices";

export const ChangePasword = (props: any) => {
  const { login, alertSet } = props;

  const localStorageusrToken: string | undefined | null =
    sessionStorage.getItem("_usrToken");
  const [val, setVal] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);
  const ref = useRef("");

  const submitHandler = () => {
    setIsPending(true);

    if (!isEmpty && !!localStorageusrToken && localStorageusrToken !== null) {
      Agent.Auth.resetPassword(login, val, localStorageusrToken)
        .then((res) => {
          alertSet(
            res.ResultMessage ? res.ResultMessage : res.Fault.faultstring,
            res.ResultCode || res.ResultCode === 0
          );
        })
        .catch((err) => {
          alertSet(
            err.resultMessage ? err.resultMessage : "Неизвестная ошибка",
            err.resultCode && err.resultCode === 0
          );
        })
        .finally(() => {
          setVal("");
          setIsPending(false);
        });
    }
    setIsPending(false);
  };

  useEffect(() => {
    if (!val || val === null || val === "") {
      setIsEmpty(true);
    } else setIsEmpty(false);
  }, [val]);

  const changeHandler = (e: any) => {
    setVal(e.target.value);
  };

  return (
    <>
      <TextField
        disabled={isPending}
        type="password"
        inputRef={ref}
        name="password"
        value={val}
        onChange={changeHandler}
        label="Новый пароль"
        autoComplete="new-password"
      />
      <Button
        disabled={isPending || isEmpty}
        color="secondary"
        variant="contained"
        onClick={submitHandler}
      >
        Сменить пароль
      </Button>
    </>
  );
};
