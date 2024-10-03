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

export const PermissionsGetList = ({ ...props }) => (
  <List
    {...props}
    title="Идентификаторы прав Ддиспетчера"
    // filters={<UnitRole_ConfigFilter />}
    perPage={25}
  >
    <Datagrid isRowSelectable={() => false}>
      <EditButton />
      <NumberField source="id" label="Идентификатор" />
      {/* <TextInput source="Aesculap" label="Врач" /> */}
      <TextField source="Logistician" label="Логист" />
      <TextField source="Aesculap" label="Врач" />
      <TextField source="Cabinette_Medic" label="Стационарный диагност" />
      <TextField source="Reanimation" label="Доступ к реанимации" />
      <TextField source="Head_Dpt" label="Зав. отделением" />
      <TextField source="Paramedic" label="Медсестра" />
      <TextField source="Common_Access" label="Общий доступ" />
      <TextField source="Sanitaire" label="Бригадир санитаров" />
      <TextField source="Dispatcher" label="Диспетчер СМП" />
      <TextField source="Mobile_Medic" label="Мобильный диагност" />
    </Datagrid>
  </List>
);
