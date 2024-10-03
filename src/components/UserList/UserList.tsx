/* eslint-disable import/no-extraneous-dependencies */
import { useState } from "react";
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  NumberField,
  DateField,
  Edit,
  Create,
  SimpleForm,
  NumberInput,
  TextInput,
  TopToolbar,
  ListButton,
  Filter,
  SelectInput,
  Toolbar,
  useGetOne,
} from "react-admin";

import { useParams } from "react-router-dom";
import MuiAlert from "@mui/material/Alert";
import { Typography } from "@mui/material";
// import { DatagridAG } from "../../extra/ra-datagrid-ag";
import { DatagridAG } from "@react-admin/ra-datagrid-ag";
import { ChangePasword } from "./ChangePasword";
import { CreateUser } from "./CreateUser";
import { WorkplacesList } from "./WorkplacesList";
import { EditUser } from "./EditUser";

const roleChoices = [
  { id: 1, name: "SysAdmin" },
  { id: 2, name: "Бизнес-администратор" },
  { id: 3, name: "Супервизор UNNIT " },
  { id: 4, name: "Исполнитель Услуги" },
  { id: 5, name: "Табло" },
];

const UserEditToolbar = (props: any) => {
  console.log({ props });

  return (
    <Toolbar {...props}>
      <></>
    </Toolbar>
  );
};

export const WorkPlaceFilter = (props: any) => {
  console.log("WorkPlaceFilter", props);
  return (
    <Filter {...props}>
      <NumberInput source="id" alwaysOn />
    </Filter>
  );
};

const EditAside = (alertSet: any) => {
  //   const { id, login, alertSet } = props;
  const { id } = useParams<{id: string}>();

  const { data, isLoading, error } = useGetOne("AU_Users", {
    id,
  });

  if (isLoading) {
    return <></>;
  }

  if (data) {
    return (
      <div style={{ width: 200, margin: "1em" }}>
        <Typography variant="h6">Смена пароля</Typography>
        <Typography variant="body2">
          Введите новый пароль для текущего пользователя
        </Typography>
        <ChangePasword login={data?.Login} id={id} alertSet={alertSet} />
      </div>
    );
  }
  return <></>;
};

function Alert(props: any) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const AUUsersEdit = () => {
  // console.log('AUUsersEdit', props);

  // const {id} = props;
  const { id } = useParams<{id: string}>();
  const [open, setOpen] = useState(false);
  const [resultMessage, setResultMessage] = useState("");
  const [resultSuccess, setResultSuccess] = useState(true);

  const alertSet = (msg: string, status: boolean) => {
    setResultMessage(msg);
    setResultSuccess(status);
    handleClick();
  };

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Edit
      title="Редактирование параметров пользователя"
      mutationMode="pessimistic"
      aside={
        <EditAside
          alertSet={alertSet}
          // {...props}
        />
      }
    >
      <SimpleForm toolbar={<UserEditToolbar />}>
        <div style={{ width: "100%" }}>
          <Typography variant="h6">Параметры польльзователя</Typography>
          <Typography variant="body2" />
        </div>

        <EditUser />

        <WorkplacesList UserId={id} alertSet={alertSet} />
        <div style={{ width: "100%" }}>
          {open && (
            <Alert
              onClose={handleClose}
              severity={resultSuccess ? "success" : "error"}
            >
              {resultMessage}
            </Alert>
          )}
        </div>
      </SimpleForm>
    </Edit>
  );
};

export const PostCreateActions = () => (
  <TopToolbar>
    <ListButton resource="AU_Users" label="Вернуться к списку пользователей" />
  </TopToolbar>
);

export const AUUsersCreate = (props: any) => (
  <Create
    {...props}
    title="Создание пользователя"
    actions={<PostCreateActions />}
  >
    <CreateUser />
  </Create>
);

export const AUUsersFilter = (props: any) => (
  <Filter {...props}>
    <NumberInput label="# Usr_Id" source="id" alwaysOn />
    <TextInput label="Login" source="Login" alwaysOn />
    <TextInput label="Пользователь" source="Usr_Name" alwaysOn />
    <SelectInput
      label="Код роли"
      choices={roleChoices}
      emptyText="Выберите роль"
      source="Role_Id"
      alwaysOn
    />
  </Filter>
);

export const UserList = (props: any) => {
  const columnDefs = [
    {
        headerCheckboxSelection: true,
        checkboxSelection: true,
        editable: true,
        minWidth: 48,
        maxWidth: 48,
    },
    { field: 'id', label: 'Usr_Id' },
    { field: 'Login' },
    { field: 'Usr_Name', label: 'Пользователь' },
    { field: 'Role_Id' },
    { field: 'Usr_State' },
    { field: 'Last_Change_Info_Dt' },
];
  return (
  <List
    {...props}
    title="Ведение списка пользователей"
    perPage={25}
    filters={<AUUsersFilter />}
    sort={{ field: "id", order: "ASC" }}
  >
    {/* <Datagrid>
      <EditButton />
      <NumberField source="id" label="Usr_Id" />
      <TextField source="Login" label="Login" />
      <TextField source="Usr_Name" label="Пользователь" />
      <NumberField source="Role_Id" label="Код роли" />
      <TextField source="Usr_State" label="Статус" /> */}

      {/*<TextField source="Last_Act_Dt" label="Last_Act_Dt" />*/}
      {/* <TextField source="Last_Change_Info_Dt" label="Время последнего изменения" /> */}
      {/*<TextField source="Prof_Prefix" label="Специализация" />*/}

      {/*<DateField source="Lastdate" label={'Обновлено'} showTime={true}/>*/}
      {/*<TextField source="Lastmaker" label={'АффторЪ'} sortable={false} />*/}
    {/* </Datagrid> */}
    <Datagrid>
      <EditButton />
      <NumberField source="id" label="Usr_Id" />
      <TextField source="Login" label="Login" />
      <TextField source="Usr_Name" label="Пользователь" />
      <NumberField source="Role_Id" label="Код роли" />
      <TextField source="Usr_State" label="Статус" />

      {/*<TextField source="Last_Act_Dt" label="Last_Act_Dt" />*/}
      <TextField source="Last_Change_Info_Dt" label="Время последнего изменения" />
      {/*<TextField source="Prof_Prefix" label="Специализация" />*/}

      {/*<DateField source="Lastdate" label={'Обновлено'} showTime={true}/>*/}
      {/*<TextField source="Lastmaker" label={'АффторЪ'} sortable={false} />*/}
    </Datagrid>
    {/* <DatagridAG columnDefs={columnDefs} /> */}
      {/* <EditButton />
      <NumberField source="id" label="Usr_Id" />
      <TextField source="Login" label="Login" />
      <TextField source="Usr_Name" label="Пользователь" />
      <NumberField source="Role_Id" label="Код роли" />
      <TextField source="Usr_State" label="Статус" /> */}

      {/*<TextField source="Last_Act_Dt" label="Last_Act_Dt" />*/}
      {/* <TextField source="Last_Change_Info_Dt" label="Время последнего изменения" /> */}
      {/*<TextField source="Prof_Prefix" label="Специализация" />*/}

      {/*<DateField source="Lastdate" label={'Обновлено'} showTime={true}/>*/}
      {/*<TextField source="Lastmaker" label={'АффторЪ'} sortable={false} />*/}
    {/* </DatagridAG> */}
  </List>
)};
