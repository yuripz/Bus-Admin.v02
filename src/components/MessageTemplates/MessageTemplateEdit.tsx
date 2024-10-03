import React, { useState } from "react";

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
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { MessageTemplatesXMLEntry } from './MessageTemplatesXMLEntry';

const useStyles = makeStyles({
  inlineBlock: { display: "inline-flex", marginRight: "1rem" },
});

const sTemplate: string =
  "<xsl:styleshee>\n" +
  '<xsl:output method="xml" version="1.0" encoding="UTF-8" indent="yes"/>\n' +
  '<xsl:template match="/">\n' +
  '<xsl:for-each select="Confirmation">\n' +
  "</xsl:for-each>\n" +
  "</xsl:template>\n" +
  "</xsl:stylesheet>";

/*
const ShowTemplateConf = (recordId: Identifier, ConfigEntry: Identifier ) => {
    //const record = useRecordContext();
    //console.warn('PostPanel=', id, record);
    //console.warn('MessagePanel resource=', resource )
    //let shownString: string = record.id.toString(); // + ' (' + record.Msg_Result + ')';
    //const htmlString: string = shownString.toString();
    return (
        <div id={`${recordId}#`}> <textarea value={`recordId = ${recordId.toString()} \n ConfigEntry= ${ConfigEntry.toString}`} readOnly rows={10} cols={100} /></div>
    );
}
 */
const MessageTemplatesGetConfigUrl = `${process.env.REACT_APP_CUSTOM_API}/MessageTemplatesGetConfig`;
// const fetchMessageTemplatesEntry = () => {
//   const recordId: Identifier = 0;
//   const Template = useRecordContext();
//   const notify = useNotify();
//   if (!Template) return null;
//   const TemplatesGetConfigQryParam = Template.id.toString().split("-@-");
//   const TemplatesGetConfigQry: string = `?Template_Id=${TemplatesGetConfigQryParam[0]}&ConfigEntry=${TemplatesGetConfigQryParam[1]}`;
//   console.log(
//     "MessageTemplatesGetConfig: TemplatesGetConfigQry=",
//     TemplatesGetConfigQry,
//     "id=",
//     Template
//   );
//   //  if ( Template === undefined ) return (<div id={`${recordId}#${0}`}> </div>);

//   let [shownXmlStr, setXmlStr] = useState(sTemplate);
//   //const shownRowId= `${record.id}`;
//   console.log(
//     "MessageTemplatesGetConfigUrl: Template_Id=",
//     recordId,
//     "id=",
//     Template
//   );
//   // if ( !loading ) { setLoading(true);}
//   let { isLoading, error, data } = useQuery(
//     [`Body4MessageRequest${recordId}`, Template.id],
//     () =>
//       fetch(`${MessageTemplatesGetConfigUrl}${TemplatesGetConfigQry}`)
//         .then((response) => response.text())
//         .then((responseString) => {
//           setXmlStr(responseString);
//           // setLoading(true);
//           console.warn(`fetchMessageTemplatesEntry fetch: ${setXmlStr}`);
//         })
//         .catch((e) => {
//           notify(
//             `Error: fetchMessageTemplatesEntry not fetched: ${e.toString()}`,
//             { type: "error" }
//           );
//         })
//   );
//   if (!isLoading) {
//     // console.log(
//     //   "fetchMessageTemplatesEntry: before return shownXmlReq=",
//     //   setXmlStr
//     // );
//   }
//   // if ( !( data === undefined ) && ( data.length > 0 ) )  shownXmlStr = data;
//   const NumTextAreaRors: number = Math.round(shownXmlStr.length / 40) + 1;
//   let NumLines: number = shownXmlStr.split(/\n/).length;
//   if (NumLines < NumTextAreaRors) NumLines = NumTextAreaRors;

//   return (
//     <div id={`${recordId}#${Template.id}`}>
//       {" "}
//       <textarea value={shownXmlStr} readOnly={false} rows={NumLines} cols={100} onChange={() => console.log('recordId', recordId, 'Template.id', Template.id)} />
//         <button type="button">Click me</button>
//     </div>
//   );
//   /*
//      return ( <div id={`${recordId}#`}> <textarea value={sTemplate} readOnly rows={10} cols={100} />
//          </div>
//      ); */
// };

const commonStyles = {
  bgcolor: 'background.paper',
  m: 1,
  border: 1,
};

export const MessageTemplateEdit = (props: any) => {
  // console.warn('MessageIntefaceEdit =');
  //const [Template_Id , setTemplate_Id] = useState(0);
  const classes = useStyles();
  const controllerProps = useEditController(props);
  const {
    defaultTitle, // the translated title based on the resource, e.g. 'Post #123'
    error, // error returned by dataProvider when it failed to fetch the record. Useful if you want to adapt the view instead of just showing a notification using the `onFailure` side effect.
    record, // record fetched via dataProvider.getOne() based on the id from the location
    redirect, // the default redirection route. Defaults to 'list'
    resource, // the resource name, deduced from the location. e.g. 'posts'
    save, // the update callback, to be passed to the underlying form as submit handler
    saving, // boolean that becomes true when the dataProvider is called to update the record
  } = controllerProps;
  // console.info("MessageQueueEdit resource=", resource, " record=", record.id);
  // setTemplate_Id( record.id.toNumber );
  // filter={{  Interface_Id: row.Interface_Id }}
  return (
    <Edit {...props} title="Изменяем параметры Шаблона">
      <TabbedForm syncWithLocation>
        <FormTab label="Параметры Шаблона" syncWithLocation>
          <Box sx={{ ...commonStyles, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', borderColor: 'primary.main', borderRadius: '16px' }} >
            <div style={{ width: '100%' }}>
              <TextInput disabled
                         source="id"
                         label="Идентификатор шаблона"
                         sx={{ fontWeight: "bold", fontFamily: 'Monospace', fontSize: 14 }}
              /></div>
            <div style={{ width: '100%' }}>
              <TextInput disabled source="Interface_Id" label="Интерфейс" sx={{ fontWeight: "bold", fontFamily: 'Monospace' }} /></div>
            <div style={{ width: '100%' }}>

              <TextInput disabled
                         source="Operation_Id"
                         label="№ операции"
                         sx={{ fontWeight: "bold", fontSize: 'h4.fontSize' }} name="Operation_Id"/></div>
            </Box>


          <SelectInput
            label="Направление"
            source="Template_Dir"
            choices={[
              { id: "IN", name: "IN" },
              { id: "OUT", name: "OUT" },
            ]}
            defaultValue="IN"
          />

          <div>
            <h4 >Тип сообщения: символьная метка или имя SAOP-метода</h4>
            <TextInput disabled source="Msg_Type" label="Тип сообщения" sx={{ fontWeight: "bold", fontFamily: 'Monospace', width: '75%' }}/>
          </div>
          <br/>

          <TextInput
              multiline
              source="Template_Name"
              label="Описание - предназначение шаблона"
              fullWidth resettable
          />
          <h4 >Система, для которой предназначен шаблон ( пусто - значит для любой) </h4>
          <TextInput
              source="Templates_Msgdirection_Cod"
              label="Система источник/приёмник"
              defaultValue=""
          />
          <div>
            <TextInput disabled source="Lastdate" label="Обновлено "  />
            <TextInput disabled source="Lastmaker" label="АффторЪ" />
          </div>

        </FormTab>
        <FormTab label="Секции шаблона" syncWithLocation>
          <ReferenceManyField
            reference="MessageTemplatesEntry"
            target="Template_Id"
          >
            <Datagrid
              isRowSelectable={() => false}
              rowClick="expand"
              expand={MessageTemplatesXMLEntry}
              isRowExpandable={() => true}
            >
              <TextField source="id" label="Id# Секции шаблона" />
              <TextField source="Config_Name" label="Секция шаблона" />
              <div>record.Id={record?.id}</div>
            </Datagrid>
          </ReferenceManyField>
        </FormTab>
      </TabbedForm>
    </Edit>
  );
};
