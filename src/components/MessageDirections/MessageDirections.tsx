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
  SelectInput,
  Create,
  Filter,
  NumberInput,
} from "react-admin";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  inlineBlock: { display: "inline-flex", marginRight: "1rem" },
});

export const MessageDirectionsCreate = (props: any) => {
  const classes = useStyles();
  return (
  <Create {...props} title="Добавить систему в проект">
    <SimpleForm>
      {/* <TextInput label="Код системы" source="id" />
      <TextInput label="Msgdirection_Desc" source="Msgdirection_Desc" />
      <NumberInput label="№ группы-Класс" source="Msgdirection_Id" />
      <TextInput source="App_Server" label="JMS Queue" /> */}
        <TextInput
          type="text"
          label="Код системы"
          source="id"
          margin="normal"
          required
          formClassName={classes.inlineBlock}
          name="id"
        />

        <NumberInput
          label="№ группы-Класс"
          required
          source="Msgdirection_Id"
          formClassName={classes.inlineBlock}
        />

        <TextInput
          label="Msgdirection_Desc"
          source="Msgdirection_Desc"
          required
          margin="normal"
          inputMode="text"
          fullWidth
        />
        <div>
          <TextInput
            source="App_Server"
            label="JMS Queue"
            formClassName={classes.inlineBlock}
          />

          <SelectInput
            source="Type_Connect"
            label="Тип доступа"
            alwaysOn
            required
            choices={[
              { id: "3", name: "WS-SOAP" },
              { id: "4", name: "HTTP-GET-POST" },
              { id: "6", name: "JMS-JSON-XML" },
              { id: "1", name: "DIRECT-DB" },
            ]}
            formClassName={classes.inlineBlock}
          />
        </div>
        <TextInput source="Wsdl_Name" label="URL доступа" fullWidth />
        <div>
          <NumberInput
            source="Base_Thread_Id"
            label="Начальный NN потока"
            formClassName={classes.inlineBlock}
          />
          <NumberInput
            source="Num_Thread"
            label="Количество потоков"
            formClassName={classes.inlineBlock}
          />
        </div>
        <div>
          <TextInput
            source="Db_User"
            label="Login к системе"
            formClassName={classes.inlineBlock}
          />
          <TextInput
            source="Db_Pswd"
            label="Пароль к системе"
            formClassName={classes.inlineBlock}
          />
        </div>
        <NumberInput
          source="Short_Retry_Count"
          label="Количество попыток через короткий интервал"
          formClassName={classes.inlineBlock}
        />
        <NumberInput
          source="Short_Retry_Interval"
          label="Короткий интервал между попытками"
          formClassName={classes.inlineBlock}
        />
        <NumberInput
          source="Long_Retry_Count"
          label="Количество попыток через длинный интервал"
          formClassName={classes.inlineBlock}
        />
        <NumberInput
          source="Long_Retry_Interval"
          label="Длинный интервал между попытками"
          formClassName={classes.inlineBlock}
        />
        <NumberInput
          source="Num_Helpers_Thread"
          label="Количество потоков, которые могут помогать по списку"
          formClassName={classes.inlineBlock}
        />
        <TextInput
          source="List_Lame_Threads"
          label="Список № потоков через запятую которым будет оказана помощь "
          fullWidth
        />
        <TextInput
          source="Attachment_Dir"
          label="Путь до вложений, которые выкладывает процесс"
          fullWidth
        />
        <TextInput
          source="Ext_Upload_Path"
          label="Путь для подгрузки файлов из внешних систем"
          fullWidth
        />
    </SimpleForm>
  </Create>
)};

export const MessageDirectionsEdit = (props: any) => {
  const classes = useStyles();
  return (
    <Edit {...props} title="Изменяем параметры системы">
      <SimpleForm>
        <TextInput
          type="text"
          label="Код системы"
          source="id"
          margin="normal"
          formClassName={classes.inlineBlock}
          name="id"
        />

        <NumberInput
          label="№ группы-Класс"
          source="Msgdirection_Id"
          formClassName={classes.inlineBlock}
        />

        <TextInput
          label="Msgdirection_Desc"
          source="Msgdirection_Desc"
          margin="normal"
          inputMode="text"
          fullWidth
        />
        <div>
          <TextInput
            source="App_Server"
            label="JMS Queue"
            formClassName={classes.inlineBlock}
          />

          <SelectInput
            source="Type_Connect"
            label="Тип доступа"
            alwaysOn
            choices={[
              { id: "3", name: "WS-SOAP" },
              { id: "4", name: "HTTP-GET-POST" },
              { id: "6", name: "JMS-JSON-XML" },
              { id: "1", name: "DIRECT-DB" },
            ]}
            formClassName={classes.inlineBlock}
          />
        </div>
        <TextInput source="Wsdl_Name" label="URL доступа" fullWidth />
        <div>
          <NumberInput
            source="Base_Thread_Id"
            label="Начальный NN потока"
            formClassName={classes.inlineBlock}
          />
          <NumberInput
            source="Num_Thread"
            label="Количество потоков"
            formClassName={classes.inlineBlock}
          />
        </div>
        <div>
          <TextInput
            source="Db_User"
            label="Login к системе"
            formClassName={classes.inlineBlock}
          />
          <TextInput
            source="Db_Pswd"
            label="Пароль к системе"
            formClassName={classes.inlineBlock}
          />
        </div>
        <NumberInput
          source="Short_Retry_Count"
          label="Количество попыток через короткий интервал"
          formClassName={classes.inlineBlock}
        />
        <NumberInput
          source="Short_Retry_Interval"
          label="Короткий интервал между попытками"
          formClassName={classes.inlineBlock}
        />
        <NumberInput
          source="Long_Retry_Count"
          label="Количество попыток через длинный интервал"
          formClassName={classes.inlineBlock}
        />
        <NumberInput
          source="Long_Retry_Interval"
          label="Длинный интервал между попытками"
          formClassName={classes.inlineBlock}
        />
        <NumberInput
          source="Num_Helpers_Thread"
          label="Количество потоков, которые могут помогать по списку"
          formClassName={classes.inlineBlock}
        />
        <TextInput
          source="List_Lame_Threads"
          label="Список № потоков через запятую которым будет оказана помощь "
          fullWidth
        />
        <TextInput
          source="Attachment_Dir"
          label="Путь до вложений, которые выкладывает процесс"
          fullWidth
        />
        <TextInput
          source="Ext_Upload_Path"
          label="Путь для подгрузки файлов из внешних систем"
          fullWidth
        />
      </SimpleForm>
    </Edit>
  );
};

const MessageDirectionsFilter = (props: any) => (
  <Filter {...props}>
    <TextInput label="Код системы" source="id" alwaysOn />
    <TextInput label="Msgdirection_Desc" source="Msgdirection_Desc" alwaysOn />
    <NumberInput label="№ группы-Класс" source="Msgdirection_Id" alwaysOn />
  </Filter>
);

export const MessageDirections = ({ ...props }) => (
  <List
    {...props}
    title="Список систем"
    perPage={25}
    filters={<MessageDirectionsFilter />}
    sort={{ field: "id", order: "ASC" }}
  >
    <Datagrid isRowSelectable={() => false}>
      <EditButton />
      <TextField source="id" label="Код системы" />
      <NumberField source="Msgdirection_Id" label="№-Класса" />
      <NumberField source="Subsys_Cod" label="Подсистема" />
      <TextField source="Type_Connect_Desc" label="Тип доступа" />
      <TextField source="Msgdirection_Desc" label="Название" />
      <TextField source="Wsdl_Name" label="URL доступа" />
      <TextField source="App_Server" label="JMS Queue" />
      <NumberField source="Base_Thread_Id" label="Начальный NN потока" />
      <NumberField source="Num_Thread" label="Количество потоков" />
      <DateField source="Last_Update_Dt" label="Обновлено" showTime />
    </Datagrid>
  </List>
);
