import React from "react";
import {
  List,
  Datagrid,
  TextField,
  //EditButton,
  NumberField,
  DateField,
  Edit,
  //Create,
  SimpleForm,
  NumberInput,
  TextInput,
  //TopToolbar,
  //ListButton,
  Filter,
  SelectInput,
  //Toolbar,
  useRecordContext, useEditController, ReferenceManyField, ShowButton,
  // Show, SimpleShowLayout
} from "react-admin";
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
import { useParams } from "react-router-dom";

const directionChoices = [
  { id: "ENTRY", name: "ENTRY" },
  { id: "OUTPUT", name: "OUTPUT" },
  { id: "POSTPOND", name: "POSTPOND" },
  { id: "INWORK", name: "INWORK" },
];

export const AUOrder4QsFilter = (props: any) => (
  <Filter {...props}>
    <SelectInput
      label="Направление"
      choices={directionChoices}
      emptyText="Направление"
      source="Queue_Direction"
      alwaysOn
    />
    <TextInput label="ID ИБ КИС" source="Kis_Card_Id" alwaysOn />
    <TextInput label="№ талона ЕМИАС" source="Emias_Pass_Num" alwaysOn />
    <TextInput label="Юнит (наименование)" source="Unit_Name" alwaysOn />
    <NumberInput label="Юнит (№-идентификатор)" source="Unit_Id" alwaysOn />
  </Filter>
);

const OrderPanel = () => {
  // const { id } = useParams<{id: string}>();
  const record = useRecordContext();
  // console.warn("PostPanel=", id, record);
  //console.warn('PostPanel resource=', resource )
  return (
    <div dangerouslySetInnerHTML={{ __html: record.Kis_Service_Description }} />
  );
};

export const Order4QShow = (props: any) =>  (
    <Edit title="Журнал талона ">
      <SimpleForm>
        <TextInput disabled source="Emias_Pass_Num" label="№ талона ЕМИАС" />
        <TextInput disabled source="Kis_Card_Id" label="№ ИБ КИС" />
        <TextInput disabled source="Emias_Id" label="ЕМИАС-Идентификатор" />
        <ReferenceManyField reference="Order_Q_Log" target="Order_Id" perPage={25}>
          <Datagrid isRowSelectable={() => false}>
            <DateField source="Create_Record_Date" label='Время' showTime/>
            <NumberField source="id" label='№ в журнале' />
            <TextField source="Q_Label_From" label='Очерередь-откуда' />
            <TextField source="Q_Label_To" label='Очерередь-куда' />
            <TextField source="Login" label='Пользователь' />
            <TextField source="Usr_Name" label='Имя пользователя' />
            <TextField source="Worker_Place_Short" label='№ места'/>
            <NumberField source="Worker_Id" label='Worker_№' />
          </Datagrid>
        </ReferenceManyField>
      </SimpleForm>
    </Edit>
);



export const Order4QList = (props: any) => (
  <List
    {...props}
    title="Талоны"
    perPage={25}
    filters={<AUOrder4QsFilter />}
    sort={{ field: "id", order: "DESC" }}
  >
    <Datagrid
      rowClick="expand"
      expand={OrderPanel}
      isRowExpandable={(row) => row.id > 0}
      isRowSelectable={(row) => row.id < 0}
      optimized
    > <ShowButton label="Журнал"/>
      <NumberField source="id" label="№ записи в журнале" />
      <TextField source="Emias_Pass_Num" label="№ талона ЕМИАС" />
      <NumberField source="Kis_Card_Id" label="№ ИБ КИС" />

      <TextField source="Unit_Name" label="Юнит" />
      <NumberField source="Worker_Id" label="№ рабочего места" />
      <NumberField source="Next_Unit_Worker_Id" label="№ рабочего места следующего этапа" />

      <NumberField source="Order_Queue_Id" label="# в очереди" />
      <NumberField source="Unit_Queue_Id" label="Код очереди" />
      <NumberField source="Queue_Direction" label="Направление" />
      <TextField source="Patient_Status" label="Статус" />
      <NumberField source="Priority" label="Приоритет" />

      <DateField
        source="Entry_Date_As_Planned"
        label="Плановая дата"
        showTime
        // options={{ format: "DD.MM.YYYY 3333" }}
        options={{
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        }}
      />
      <DateField
        source="Worker_Set_Date"
        label="Назначен исполнителю"
        showTime
      />
      <DateField source="Work_Begin_Date" label="Начало работы" showTime />
      <DateField source="Work_End_Date" label="Окончание работы" showTime />

      <TextField source="Emias_Id" label="ЕМИАС-Идентификатор" />

      <TextField source="Case_Id" label="# обращения" />
      <TextField source="Kis_Service_Name" label="Код услуги КИС" />
      <TextField source="Kis_Service_Description" label="Рабочее место" />

      {/*<DateField source="Lastdate" label={'Обновлено'} showTime={true}/>*/}
      {/*<TextField source="Lastmaker" label={'АффторЪ'} sortable={false} />*/}
    </Datagrid>
  </List>
);

/*
<NumberField source="Unit_Id" label='ID Unit' />                
*/
