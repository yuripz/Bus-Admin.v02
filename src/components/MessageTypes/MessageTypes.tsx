import React from "react";
import {
    List, 
    Datagrid, 
    TextField, 
    NumberField,
    DateField,
    TextInput, 
    SelectInput,
    EditButton,
    Edit, 
    SimpleForm,
    Filter,
    NumberInput,
    Create
} from 'react-admin';

export const MessageTypesCreate = (props: any) => <Create {...props} title="Create new message Type">
        <SimpleForm>
            <NumberInput label="# Интерфейса" source="Interface_Id"/>
            <NumberInput label="№ операции" source="Operation_Id"  />
            <SelectInput label='Направление' source="Msg_Direction"  choices={[
                { id: 'IN', name: 'IN' },
                { id: 'OUT', name: 'OUT' },
            ]} />
            <TextInput source="Msg_Type" label='Тип сообщения' />
            <TextInput source="Msg_Type_Own" label='Собственный тип' />
            <TextInput source="Msg_Typedesc" label='Описание' />
        </SimpleForm>
    </Create>;

export const MessageTypesEdit = (props: any) => <Edit {...props} title="Изменяем тип сообщения edition">
        <SimpleForm>
            <NumberInput label="# Интерфейса" source="Interface_Id"/>
            <NumberInput label="№ операции" source="Operation_Id"  />
            <SelectInput label='Направление' source="Msg_Direction"  choices={[
                { id: 'IN', name: 'IN' },
                { id: 'OUT', name: 'OUT' },
            ]} />
            <TextInput source="Msg_Type" label='Тип сообщения' />
            <TextInput source="Msg_Type_Own" label='Собственный тип' />
            <TextInput source="Msg_Typedesc" label='Описание' />
        </SimpleForm>
    </Edit>;

const MessageTypesFilter = (props: any) => <Filter {...props}>
        <NumberInput label="# Интерфейса" source="Interface_Id" alwaysOn />
        <NumberInput label="№ операции" source="Operation_Id" alwaysOn />
        <SelectInput label='Направление' source="Msg_Direction"  alwaysOn choices={[
            { id: 'IN', name: 'IN' },
            { id: 'OUT', name: 'OUT' },
        ]} />
        <TextInput source="Msg_Type" alwaysOn/>
    </Filter>;

export const  MessageTypes = (props: any) =>
    <List { ...props } title="Типы сообщений" perPage={25} filters={<MessageTypesFilter /> }
    sort={{ field: 'Interface_Id', order: 'ASC' }}
>
    <Datagrid isRowSelectable={() => false} >
        <EditButton />
        <NumberField source="Interface_Id" label='Интерфейс' />
        <NumberField source="Operation_Id" label='№ операции' />
        <TextField source="Msg_Type" label='Тип сообщения' />
        <TextField source="Msg_Direction" label='Направление' />
        <TextField source="Msg_Typedesc" label='Описание' />
        <DateField source="Last_Update_Dt" label='Обновлено' />
    </Datagrid>
</List>;
