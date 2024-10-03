import { useRef, useState, useEffect } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import MuiAlert from '@mui/material/Alert';
import Select from '@mui/material/Select';
import * as Agent from '../../services/ConnectionsServices';

function Alert(props: any) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

export const CreateUser = () => {
    const localStorageusrToken: string |undefined|null = sessionStorage.getItem('_usrToken');
    const [pass, setPass] = useState("");
    const [usrName, setUsrName] = useState("");
    const [login, setLogin] = useState("");
    const [role, setRole] = useState(4);

    const [isPending, setIsPending] = useState(false);
    const [isEmpty, setIsEmpty] = useState(true);
    const [open, setOpen] = useState(false);
    const [resultMessage, setResultMessage] = useState("");
    const [resultStatus, setResultStatus] = useState("success");
    const refLogin = useRef("")
    const refPassword = useRef("")
    const refUsername = useRef("")

    const alertSet = (msg: string, status: "success" | "warning" | "error") => {
        setResultMessage(msg)
        setResultStatus(status);
        handleClick();
    }

    const submitHandler = () => {
        setIsPending(true);

        if (!isEmpty && !!localStorageusrToken && localStorageusrToken !== null) {
            const data = {
                _usrToken: localStorageusrToken,
                login: login, 
                password: pass, 
                Role_Id: role, 
                Usr_Name: usrName, 
            };
            Agent.User.create(data).then((res: any) => {
                const {ResultMessage, ResultCode, Fault} = res;
                let status: "success" | "warning" | "error" = "success";

                if(ResultCode && ResultCode !== 0) {
                    status = "warning"
                }

                alertSet(ResultMessage || Fault.faultstring, status)
            }).catch((err: any) => {
                alertSet(err.resultMessage ? err.resultMessage : "Неизвестная ошибка", "error")
            })
            .finally(() => {
                setPass("");
                setIsPending(false);
            })
        }
        setIsPending(false);
    }

    useEffect(() => {
        if (!pass || pass === null || pass === '') {
            setIsEmpty(true)
        } else setIsEmpty(false)
    }, [pass])

    const passwordHandler = (e: any) => {
        setPass(e.target.value)
    }
    const loginHandler = (e: any) => {
        setLogin(e.target.value)
    }
    const usrNameHandler = (e: any) => {
        setUsrName(e.target.value)
    }
    const roleHandler = (e: any) => {
        setRole(e.target.value)
    }

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event: any, reason: any) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    
    return (
        <div className="MuiCardContent-root">
            <div>
                <Typography variant="h6">Заполните параметры для нового пользователя</Typography>
            </div>
            <div className="ra-input">
                <div className="MuiFormControl-root MuiTextField-root RaFormInput-input-54 MuiFormControl-marginDense">
                    <TextField 
                        disabled={isPending} 
                        type="text" 
                        inputRef={refUsername} 
                        name="Usr_Name"
                        value={usrName} 
                        onChange={usrNameHandler} 
                        label='Имя пользователя' 
                        autoComplete='new-password'
                    />
                </div>
            </div>
            <div className="ra-input">
                <div className="MuiFormControl-root MuiTextField-root RaFormInput-input-54 MuiFormControl-marginDense">
                <TextField 
                    disabled={isPending} 
                    type="text" 
                    inputRef={refLogin} 
                    name="login"
                    value={login} 
                    onChange={loginHandler} 
                    label='Логин'
                    autoComplete='new-password'
                />
                </div>
            </div>
            <div className="ra-input">
                <div className="MuiFormControl-root MuiTextField-root RaFormInput-input-54 MuiFormControl-marginDense">
                    <TextField 
                        disabled={isPending} 
                        type="password" 
                        inputRef={refPassword} 
                        name="password"
                        value={pass} 
                        onChange={passwordHandler} 
                        label='Пароль' 
                        autoComplete='new-password'
                    />
                </div>
            </div>
            <div className="ra-input">
                <div className="MuiFormControl-root MuiTextField-root RaFormInput-input-54 MuiFormControl-marginDense">
                    <Select labelId="Роль" value={role} 
                        onChange={roleHandler}
                        // source="Role_Id" 
                    >
                        <MenuItem value={1} key="SysAdmin">SysAdmin</MenuItem>
                        <MenuItem value={2} key="BusAdmin">Бизнес-администратор</MenuItem>
                        <MenuItem value={3} key="Supervisor">Супервизор UNNIT</MenuItem>
                        <MenuItem value={4} key="ServiceProvider">Исполнитель Услуги</MenuItem>
                        <MenuItem value={5} key="Tablo">Табло</MenuItem>
                    </Select>
                </div>
            </div>
            <div className="ra-input">
                <Button 
                    disabled={isPending || isEmpty}
                    color="secondary" 
                    variant="contained" 
                    onClick={submitHandler}
                >
                    Создать пользователя
                </Button>
            </div>
            <hr />
            {open && <Alert onClose={handleClose} severity={resultStatus}>
                {resultMessage}
            </Alert>
            }
        </div>
    )
}