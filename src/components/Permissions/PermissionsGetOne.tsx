/* eslint-disable react/jsx-pascal-case */
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
  TabbedForm,
  FormTab,
  BooleanInput,
  BooleanField,
} from "react-admin";
//import { sizing } from '@material-ui/system';
// import {Box} from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  inlineBlock: { display: "inline-flex", marginRight: "1rem" },
});

export const PermissionsGetOne = (props: any) => {
  const classes = useStyles();
  return (
    <Edit {...props} title="Изменение параметров UI-конфигурации Юнита" mutationMode="optimistic">
      <TabbedForm>
        <FormTab label="UI-конфигкрация">
          <div>
          <NumberInput disabled source="Unit_Id" label="№ Юнита, Идентификатор" />

              <TextInput disabled source="Unit_Name" label="Наименование Юнита" helperText="шаг бизнес процесса"/>

          </div>
          <div>
          <NumberInput disabled source="Role_Id" label="Id Роли Системы" />

            <strong>
              <TextInput disabled  source="Role_Label" label="Код роли системы" />
            </strong>
          </div>
          <BooleanInput
            source="Orderentryqueuegetlist"
            label="?показывать свою входную очередь"
            helperText="признак - надо ли показывать свою входную очередь - Обязательно!"
          />
          <BooleanInput
            source="Orderpostpoundqueuegetlist"
            label="?показывать свою очередь Неявка"
            helperText="признак - надо ли показывать очередь неявки своего Юнита "
          />
          <BooleanInput
            source="Nextentryworkersqueuegetlist"
            label="?показывать входную очередь следующего Юнита"
            helperText="признак - надо ли показывать входную очередь следующего Юнита "
          />
          <BooleanInput
            source="Nextpostpondqueuegetlist"
            label="?Неявка следующего Юнита"
            helperText="признак - надо ли показывать очередь неявки следующего Юнита "
          />
          <BooleanInput source="Controls" label="?Вызов-Приём" helperText="признак - надо ли показывать эдементы управления приёмом "/>

          <BooleanInput source="Nextexecutorgetlist" label="is nextexecutor" helperText="признак - надо ли показывать табло следующего Юнита "/>

        </FormTab>
      </TabbedForm>
    </Edit>
  );
};
