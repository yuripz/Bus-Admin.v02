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

export const PermissionsPut = (props: any) => {
  const classes = useStyles();
  return (
    <Edit {...props} title="Изменяем параметры системы">
      <TabbedForm>
        <FormTab label="Permissions">
          <div>
          {/* <NumberInput disabled source="Id" label="Идентификатор" /> */}
          <TextInput source="Logistician" label="Логист" />
          <TextInput source="Mobile_Medic" label="Мобильный диагност" />
          </div>
          <div>
            <TextInput source="Aesculap" label="Врач" />
            <TextInput source="Cabinette_Medic" label="Стационарный диагност" />
          </div>
          <div>
            <TextInput source="Reanimation" label="Доступ к реанимации" />
            <TextInput source="Head_Dpt" label="Зав. отделением" />
          </div>
          <div>
            <TextInput source="Paramedic" label="Медсестра" />
            <TextInput source="Common_Access" label="Общий доступ" />
          </div>
          <div>
            <TextInput source="Sanitaire" label="Бригадир санитаров" />
            <TextInput source="Dispatcher" label="Диспетчер СМП" />
          </div>
        </FormTab>
      </TabbedForm>
    </Edit>
  );
};