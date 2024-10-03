import React from "react";
import {
    List, 
    Datagrid, 
    TextField, 
    NumberField, 
    DateField, 
    EditButton, 
} from 'react-admin';

export const  Place2Woker4UsrIdGetList = ({ ...props }) => <List 
    { ...props } title="Интерфейсы" perPage={25}
    sort={{ field: 'Interface_Id', order: 'ASC' }}
    >
        <Datagrid isRowSelectable={() => false } >
            <EditButton />
            <NumberField source="Interface_Id" label='Интерфейс' />
            <TextField source="Msg_Direction" label='Направление' />
            <TextField source="Msg_Typedesc" label='Описание' />
            <TextField source="Url_Soap_Send" label='Url-Servlet' />
            <TextField source="Url_Soap_Ack" label='Признак-папаметр' />
            <DateField source="Last_Update_Dt" label='Обновлено' />
        </Datagrid>
    </List>;
