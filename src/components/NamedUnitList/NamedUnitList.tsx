import React from "react";
import {
  List,
  Datagrid,
  TextField,
  //EditButton,
  NumberField,
  DateField,
  //Edit,
  //Create,
  //SimpleForm,
  //NumberInput,
  TextInput,
  //TopToolbar,
  //ListButton,
  Filter,
  SelectInput,
  //Toolbar,
  useRecordContext,
  useEditController,
  ReferenceManyField,
  ShowButton,
  NumberInput,
  SimpleForm,
  Show,
  SimpleShowLayout,
} from "react-admin";

import { NamedUnitAside } from './NamedUnitAside';
/*

<xsl:when test="RecordFilterFieldName ='Queue_Direction' ">
<xsl:value-of select="concat( RecordFilterFieldName, ' LIKE ', $Apos , RecordFilterFieldValue, '%'  , $Apos )"/>

<xsl:when test="RecordFilterFieldName ='Kis_Card_Id' ">
<xsl:value-of select="concat( RecordFilterFieldName, ' LIKE ', $Apos , RecordFilterFieldValue, '%'  , $Apos )"/>

<xsl:when test="RecordFilterFieldName ='Emias_Pass_Num' ">
<xsl:value-of select="concat( RecordFilterFieldName, ' LIKE ', $Apos , RecordFilterFieldValue, '%'  , $Apos )"/>

<xsl:when test="RecordFilterFieldName ='Unit_Name' ">
<xsl:value-of select="concat( RecordFilterFieldName, ' LIKE ', $Apos , RecordFilterFieldValue, '%'  , $Apos )"/>


{
  "Order_Id": 4901,
  "Entry_Date_As_Planned": "2021.10.31T22:33:18+03:00",
  "Worker_Set_Date": null,
  "Case_Id": "0c7a7610-118e-47c2-88bf-0ef57bd280014",
  "Patient_Status": "Ожидает",
  "Unit_Queue_Id": 301,
  "Priority": 0,
  "Queue_Direction": "ENTRY",
  "Kis_Card_Id": 28014,
  "Work_Begin_Date": null,
  "Order_Queue_Id": 6901,
  "Unit_Id": 3,
  "Kis_Service_Name": "НГК",
  "Emias_Pass_Num": "НГК014",
  "Emias_Id": 1028014,
  "Worker_Id": 0,
  "Kis_Service_Description": "Процедурная, 2-й этаж",
  "Work_End_Date": null,
  "Unit_Name": "Процедурная, 2-й этаж",
  "Next_Unit_Worker_Id": 0
}
*/
/*
const isFalse = () => {
    return (false);
}
*/
// import { useParams } from "react-router-dom";

export const NamedUnitListShow = (props: any) => {
  // console.warn('MessageIntefaceEdit =');
  const consoleWarn = ""; //  ...props;
  const controllerProps = useEditController(props);
  const {
    //basePath, // deduced from the location, useful for action buttons
    defaultTitle, // the translated title based on the resource, e.g. 'Post #123'
    error, // error returned by dataProvider when it failed to fetch the record. Useful if you want to adapt the view instead of just showing a notification using the `onFailure` side effect.
    //loaded, // boolean that is false until the record is available
    //loading, // boolean that is true on mount, and false once the record was fetched
    record, // record fetched via dataProvider.getOne() based on the id from the location
    redirect, // the default redirection route. Defaults to 'list'
    resource, // the resource name, deduced from the location. e.g. 'posts'
    save, // the update callback, to be passed to the underlying form as submit handler
    saving, // boolean that becomes true when the dataProvider is called to update the record
    //version, // integer used by the refresh feature
  } = controllerProps;
  //console.warn('MessageIntefaceEdit =', consoleWarn);
  // filter={{  Interface_Id: row.Interface_Id }}
  return (
    <Show
      aside={<NamedUnitAside />}
    >
      <SimpleForm>
        <NumberInput disabled source="id" label="ID Списка" />
        <TextInput disabled source="List_Label" label="Програмная метка" />
        <TextInput
          disabled
          source="List_Name"
          label="Название списка"
          fullWidth
        />

        <ReferenceManyField reference="Named_List_Member" target="List_Id">
          <Datagrid>
            <NumberField source="Unit_Id" label="№№ Юнита" />
            <TextField
              source="Unit_Name"
              label="Имя Юнита, входящего в список"
            />
          </Datagrid>
        </ReferenceManyField>
      </SimpleForm>
    </Show>
  );
};

export const NamedUnitList = () => (
  <List
    title="Програмные метки"
    perPage={25}
    sort={{ field: "id", order: "DESC" }}
  >
    <Datagrid isRowSelectable={() => false}>
      <ShowButton />
      <NumberField source="id" label="ID Списка" />
      <TextField source="List_Label" label="Програмная метка" />
      <TextField source="List_Name" label="Название списка" />

      {/*<<DateField
        source="Entry_Date_As_Planned"
        label="Плановая дата"
        showTime
        options={{ format: "DD.MM.YYYY 3333" }}
      />
      <DateField
        source="Worker_Set_Date"
        label="Назначен исполнителю"
        showTime
      />
      <DateField source="Work_Begin_Date" label="Начало работы" showTime />
      <DateField source="Work_End_Date" label="Окончание работы" showTime />

      <NumberField source="Emias_Id" label="ЕМИАС-Идентификатор" />

      <TextField source="Case_Id" label="ID обращения" />
      <TextField source="Kis_Service_Name" label="Код услуги КИС" />
      <TextField source="Kis_Service_Description" label="Описание услуги КИС" />
*/}
      {/*<DateField source="Lastdate" label={'Обновлено'} showTime={true}/>*/}
      {/*<TextField source="Lastmaker" label={'АффторЪ'} sortable={false} />*/}
    </Datagrid>
  </List>
);

/*
<NumberField source="Unit_Id" label='ID Unit' />                
*/
