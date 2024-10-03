import { useState, useEffect } from 'react';
import { Typography, CircularProgress } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import * as Agent from '../../services/ConnectionsServices';
import { Place2Woker4UsrIdGetListItemType, SetWorkPlaceslistResponseType } from '../../services/ConnectionsServices.types';

export const WorkplacesList = (props: any) => {
    const { UserId, alertSet } = props;
    const [workPlaceslist, setWorkPlaceslist] = useState([{}]);
    const [pending, setPending] = useState(true);
    const localStorageusrToken: string |undefined|null = sessionStorage.getItem('_usrToken');

    useEffect(() => {
        if (workPlaceslist.length === 1 && localStorageusrToken) {
            Agent.User.getWorkerPlaceList(UserId, localStorageusrToken )
                .then((res) => {
                    setWorkPlaceslist(res);
                })
            .catch((err: any) => {
                alertSet(err.resultMessage ? err.resultMessage : "Неизвестная ошибка", false)
            })
            .finally(() => {
                setPending(false);
            })
        }
        setPending(false);
    })

    const handleChange = (e: any) => {
        const placeId = e.target.id;
        const isUsed = e.target.checked ? 1 : 0;

        setPending(true);

        if (localStorageusrToken)
        {
            Agent.User.setWorkPlaceslist( placeId, UserId, isUsed, localStorageusrToken)
            .then((res: SetWorkPlaceslistResponseType) => {
                console.log(res);
                const {resultMessage, resultCode} = res as SetWorkPlaceslistResponseType;
                let status: boolean = true;

                if(resultCode && resultCode !== 0) {
                    status = false
                }

                alertSet(resultMessage, status);
            })
            .catch((err) => {
                alertSet(err.resultMessage ? err.resultMessage : "Неизвестная ошибка", false)
            })
            .finally(() => {
                setPending(false);
                setWorkPlaceslist([{}]);
            })
        }
        setPending(false);
    }

    return (
        <>
            <div>
                <Typography variant="h6">
                    Укажите разрешенные пользователю расположения рабочих мест
                </Typography>
            </div>
            {pending ? 
                <CircularProgress /> : 
                <div className="MuiCardContent-root">
                    <FormGroup>
                    {workPlaceslist.length > 1 && workPlaceslist.map((item) => {
                        const { Is_Used: isUsed, Name, Place_Id: placeId } = item as Place2Woker4UsrIdGetListItemType;
                        const switchStatus = isUsed === 1;
                        return (<div>
                            <FormControlLabel control={
                            <Switch 
                                id={`${placeId}`}
                                checked={switchStatus}
                                onChange={handleChange}
                            />
                            } label={Name} />
                        </div>)
                    })}
                    </FormGroup>
                </div>
            }
        </>
    )
}