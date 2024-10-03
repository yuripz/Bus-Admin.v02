import React from "react";
import {
    List,
    Datagrid,
    TextField,
    NumberField,
    DateField,
    EditButton,
    Edit,
    SimpleForm,
    TextInput,
    Create,
    Filter,
    NumberInput,
    TabbedForm,
    FormTab,
    Pagination,
    ReferenceManyField, required, useEditController, useRedirect, useRecordContext, DateInput, TimeInput
} from 'react-admin';
import Box from '@mui/material/Box';

export const MessageIntefaceCreate = (props: any) => (
    <Create {...props} title="Create new Interface">
        <SimpleForm>
            <NumberInput label="# Интерфейса" source="Interface_Id"/>
            <TextInput source="Msg_Type" label='Тип сообщения' />
            <TextInput source="Msg_Type_Own" label='Собственный тип' />
                <TextField source="Url_Soap_Send" label='Url-Servlet' />
                <TextField source="Url_Soap_Ack" label='Признак-параметр' />
            <TextInput source="Msg_Typedesc" label='Описание'  />
        </SimpleForm>
    </Create>
);
const DashboardButton = () => {
    const redirect = useRedirect();
    const RecordContext = useRecordContext();
    const handleClick = () => {
        console.info("MessageIntefaceEdit redirect: ",`MessageTemplates/${RecordContext.id}`);
        redirect( "edit", "MessageTemplates", RecordContext.id) ;
    }
    return <button type="button" onClick={handleClick}>MessageTemplates</button>;
}
const commonStyles = {
    bgcolor: 'background.paper',
    m: 1,
    border: 1,
    width: '30%',
};

export const MessageIntefaceEdit = (props: any) => {
    // console.warn('MessageIntefaceEdit =');
    const consoleWarn = ''; //  ...props;
    const controllerProps = useEditController(props);
    const {
        //basePath, // deduced from the location, useful for action buttons
        defaultTitle, // the translated title based on the resource, e.g. 'Post #123'
        error,  // error returned by dataProvider when it failed to fetch the record. Useful if you want to adapt the view instead of just showing a notification using the `onFailure` side effect.
        //loaded, // boolean that is false until the record is available
        //loading, // boolean that is true on mount, and false once the record was fetched
        record, // record fetched via dataProvider.getOne() based on the id from the location
        redirect, // the default redirection route. Defaults to 'list'
        resource, // the resource name, deduced from the location. e.g. 'posts'
        save, // the update callback, to be passed to the underlying form as submit handler
        saving, // boolean that becomes true when the dataProvider is called to update the record
        //version, // integer used by the refresh feature
    } = controllerProps;
    console.warn('MessageIntefaceEdit =', consoleWarn);
    // filter={{  Interface_Id: row.Interface_Id }}
    return(
        <Edit  {...props} title="Изменяем параметры интерфейса">
            <TabbedForm>
                <FormTab label="Параметры интерфейсa">
                    <Box sx={{ ...commonStyles, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', borderColor: 'primary.main', borderRadius: '16px' }} >
                        <div style={{ width: '100%' }}>
                        <NumberInput disabled label="# Интерфейса" source="id"/></div>
                        <div style={{ width: '100%' }}>
                        <NumberInput disabled label="№ операции" source="Operation_Id"  /></div>
                    </Box>
                    <TextInput source="Msg_Type" label='Тип сообщения' validate={required()} sx={{ fontWeight: "bold", fontFamily: 'Monospace', width: '50%' }}/>
                    <TextInput source="Msg_Type_Own" label='Собственный тип (не используется)' sx={{  width: '50%' }}/>
                    <TextInput multiline source="Msg_Typedesc" label='Описание' sx={{ fontWeight: "bold", fontFamily: 'Monospace', width: '75%' }} />
                    <TextInput source="Url_Soap_Send" label='Url-Servlet' validate={required()} sx={{  width: '50%' }}/>
                    <TextInput source="Url_Soap_Ack" label='Признак-параметр' />
                    <div>
                        <TextInput disabled source="Last_Update_Dt" label="Обновлено (дата)" sx={{  width: '50%' }} />
                        <TimeInput disabled source="Last_Update_Dt" label="Обновлено (время)" sx={{  width: '50%' }}/>
                    </div>
                </FormTab>
                <FormTab label="Типы сообщений на интерфейсе">
                    <ReferenceManyField reference="MessageTypes" target="Interface_Id" pagination={<Pagination />} perPage={25}>
                        <Datagrid isRowSelectable={() => false} >
                            <NumberField source="Operation_Id" label='№ операции' />
                            <TextField source="Msg_Type" label='Тип сообщения' />
                            <TextField source="Msg_Direction" label='Направление' />
                            <TextField source="Msg_Typedesc" label='Описание' />
                            <DateField source="Last_Update_Dt" label='Обновлено' />
                        </Datagrid>
                    </ReferenceManyField>
                </FormTab>
                <FormTab label="Шаблоны на интерфейсе">
                    <ReferenceManyField reference="MessageTemplates" target="Interface_Id" pagination={<Pagination />} perPage={25} >
                        <Datagrid isRowSelectable={() => false}
                                  rowClick="expand"
                                  expand={ DashboardButton } isRowExpandable={ ()=> true }>
                            <NumberField source="Operation_Id" label='№ операции' />
                            <TextField source="Template_Dir" label='Направление' />
                            <TextField source="Msg_Type" label='Тип сообщения' />
                            <TextField source="Template_Name" label='Описание' />
                            <TextField source="Templates_Msgdirection_Cod" label='Система' />
                            <DateField source="Lastdate" label='Обновлено' showTime/>
                        </Datagrid>
                    </ReferenceManyField>
                </FormTab>
            </TabbedForm>
        </Edit>
    );
}

const MessageIntefacesFilter = (props: any) => (
    <Filter {...props}>
        <NumberInput label="# Интерфейса" source="id" alwaysOn />
        <TextInput source="Msg_Type" alwaysOn/>
    </Filter>
);

export const  MessageIntefaces = ({ ...props }) => <List 
    { ...props } title="Интерфейсы" perPage={25} filters={<MessageIntefacesFilter /> }
    sort={{ field: 'Interface_Id', order: 'ASC' }}
    >
        <Datagrid isRowSelectable={() => false } >
            <EditButton />
            <NumberField source="id" label='Интерфейс' />
            <TextField source="Msg_Direction" label='Направление' />
            <TextField source="Msg_Typedesc" label='Описание' />
            <TextField source="Url_Soap_Send" label='Url-Servlet' />
            <TextField source="Url_Soap_Ack" label='Признак-параметр преобразования ответа' />
            <DateField source="Last_Update_Dt" label='Обновлено' />
        </Datagrid>
    </List>;
