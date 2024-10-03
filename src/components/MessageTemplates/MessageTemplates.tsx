import {
  List,
  Datagrid,
  TextField,
  NumberField,
  DateField,
  TextInput,
  ReferenceInput,
  SelectInput,
  Filter,
  NumberInput,
  useEditController,
  Edit,
  TabbedForm,
  FormTab,
  ReferenceManyField,
  Labeled,
  useNotify,
  EditButton,
  useRecordContext,
  Identifier,
} from "react-admin";
import { makeStyles } from "@mui/styles";

import { useQuery } from "react-query";
import { string } from "prop-types";

const useStyles = makeStyles({
  inlineBlock: { display: "inline-flex", marginRight: "1rem" },
});

const ShowTemplateName = () => {
  const RecordContext = useRecordContext();
  //if (!RecordContext) return null;
  //console.warn('PostPanel=', id, record);
  //console.warn('MessagePanel resource=', resource )
  let shownString: string = RecordContext.id.toString(); // + ' (' + record.Msg_Result + ')';
  //const htmlString: string = shownString.toString();
  return (
    <div id={`${RecordContext.id}#`}>
      {" "}
      <textarea
        value={RecordContext.Template_Name.toString()}
        readOnly
        rows={2}
        cols={100}
      />
    </div>
  );
};
const MessageTemplatesFilter = (props: any) => (
  <Filter {...props}>
    <NumberInput label="# Интерфейса" source="Interface_Id" alwaysOn />
    <NumberInput label="№ операции" source="Operation_Id" alwaysOn />
    {/*<BooleanInput source="is_published" alwaysOn />*/}
    {/*<TextInput source="Template_Dir" defaultValue="IN" />*/}
    <SelectInput
      label="Направление"
      source="Template_Dir"
      alwaysOn
      choices={[
        { id: "IN", name: "IN" },
        { id: "OUT", name: "OUT" },
      ]}
    />
    <TextInput source="Msg_Type" alwaysOn />
  </Filter>
);

export const MessageTemplates = (props: any) => (
  <List
    {...props}
    title="Шаблоны сообщений"
    perPage={25}
    filters={<MessageTemplatesFilter />}
    sort={{ field: "Interface_Id", order: "ASC" }}
  >
    <Datagrid
      isRowSelectable={() => false}
      rowClick="expand"
      expand={ShowTemplateName}
      isRowExpandable={() => true}
      optimized
    >
      <EditButton label="=>"/>
      <NumberField source="Interface_Id" label="Интерфейс" />
      <NumberField source="Operation_Id" label="№ операции" />
      <TextField source="Template_Dir" label="Направление" />
      <TextField source="Msg_Type" label="Тип сообщения" />
      <TextField source="Template_Name" label="Описание" />
      <TextField source="Templates_Msgdirection_Cod" label="Система" />
      <DateField source="Lastdate" label="Обновлено" showTime />
      <TextField source="Lastmaker" label="АффторЪ" sortable={false} />
    </Datagrid>
  </List>
);
