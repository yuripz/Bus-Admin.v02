import { useQuery } from "react-query";
import {
  List,
  Datagrid,
  TextField,
  NumberField,
  DateField,
  TextInput,
  SelectInput,
  Filter,
  DateInput,
  NumberInput,
  DateTimeInput,
  useEditController,
  Edit,
  TabbedForm,
  FormTab,
  // required,
  ReferenceManyField,
  EditButton,
  useNotify,
  // useRedirect,
  useRecordContext,
  Identifier,
} from "react-admin";
import Button from '@mui/material/Button';
import { Save } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import { useState, useRef } from "react";
//import { useDispatch } from 'react-redux';
// import {useParams} from "react-router-dom";
import { useSendXml } from "../../services/use-send-xml";

const useStyles = makeStyles({
  inlineBlock: { display: "inline-flex", marginRight: "1rem" },
});

const getRequest4MessageQueueLogUrl = `${process.env.REACT_APP_CUSTOM_API}/GetRequest4MessageQueueLog`;
const GetResponse4MessageQueueLogUrl = `${process.env.REACT_APP_CUSTOM_API}/GetResponse4MessageQueueLog`;
const GetRequest_Body4MessageUrl = `${process.env.REACT_APP_CUSTOM_API}/GetRequest_Body4Message`;
const GetRequest_Confirmation4MessageUrl = `${process.env.REACT_APP_CUSTOM_API}/GetRequest_Confirmation4Message`;

const QueueDirectionChoices = [
  { id: "NEWIN", name: "NEWIN поставлено в таблицу напрямую" },
  { id: "ERRIN", name: "ERRIN ошибка в формате входящего или настройках" },
  { id: "IN", name: "IN прошло входной контроль и ждет исполнения" },
  { id: "EXEIN", name: "EXEIN обработчик отработал" },
  { id: "DELIN", name: "DELIN отправлено подтверждение об обработке" },
  { id: "OUT", name: "OUT поставлено в очередь внутренней системой" },
  {
    id: "ERROUT",
    name: "ERROUT ошибка в формате сообщения для передачи или ошибка при передаче",
  },
  { id: "SEND", name: "SEND готово к отправке на передачу и передается" },
  {
    id: "EXEOUT",
    name: "EXEOUT нормально отправлено и ожидается подтверждение обработки",
  },
  {
    id: "RESOUT",
    name: "RESOUT пришло подтверждение об исполнении, нормальное или с ошибкой",
  },
  {
    id: "DELOUT",
    name: "DELOUT бизнес-метод зафиксировал подтверждение об исполнении",
  },
  { id: "ATTOUT", name: "ATTOUT бизнес ошибка в полученных данных" },
  { id: "WAITOUT", name: "WAITOUT: поставлено в таблицу в режиме отладки" },
];

const isPreLoading =
  "\t\t<Context>\n" +
  "\t\t\t\t\n" +
  "\t\t\t\t...isLoading\n" +
  "\t\t\t\t\n" +
  "\t\t</Context>";

// interface responseXmlStr {
//   shownXmlStr: string | null;
// }

const useQueryFetch4MessageQueueBody = (recordId: Identifier) => {
  //const record = useRecordContext();
  const notify = useNotify();
  // const [loading, setLoading] = useState(false);
  // - заполнено чисто для отладки, что бы сначала без бека посмотреть как XML рендерится
  const [shownXmlReq, setXmlReq] = useState(isPreLoading);
  const [shownXmlRes, setXmlRes] = useState(isPreLoading);

  // console.log("useQueryFetch4MessageQueueBody: id=", recordId);
  // if ( !loading ) { setLoading(true);}
  let { isLoading, error, data } = useQuery(
    ["Body4MessageRequest", recordId],
    () =>
      fetch(`${GetRequest_Body4MessageUrl}?Queue_Id=${recordId}`)
        .then((response) => response.text())
        .then((responseString) => {
          setXmlReq(responseString);
          // setLoading(true);
          console.warn(`useQueryFetch4MessageQueueBody fetch: ${shownXmlReq}`);
        })
        .catch((e) => {
          notify(
            `Error: GetRequest_Body4Message not fetched: ${e.toString()}`,
            { type: "error" }
          );
        })
  );
  if (!isLoading) {
    // console.log(
    //   "useQueryFetch4MessageQueueBody: before return shownXmlReq=",
    //   shownXmlReq
    // );
  }
  const NumTextAreaRors: number = Math.round(shownXmlReq.length / 40) + 1;
  let NumLines: number = shownXmlReq.split(/\n/).length;
  if (NumLines < NumTextAreaRors) NumLines = NumTextAreaRors;

  const result = useQuery(["Confirmation4Message", recordId], () =>
    fetch(`${GetRequest_Confirmation4MessageUrl}?Queue_Id=${recordId}`)
      .then((response) => response.text())
      .then((responseString) => {
        setXmlRes(responseString);
        // setLoading(true);
        console.warn(`GetRequest_Confirmation4Message fetch: ${shownXmlRes}`);
      })
      .catch((e) => {
        notify(
          `Error: GetRequest_Confirmation4Message not fetched: ${e.toString()}`,
          { type: "error" }
        );
      })
  );
  if (!result.isLoading) {
    // console.log(
    //   "useQueryFetch4MessageQueueLog: before return shownXmlStr=",
    //   shownXmlRes
    // );
  }
  const NumTextAreaRows = Math.round(shownXmlRes.length / 40) + 1;
  let NumLinesR = shownXmlRes.split(/\n/).length;
  if (NumLinesR < NumTextAreaRows) NumLines = NumTextAreaRows;

  // eslint-disable-next-line no-undef
  const fieldQRef = useRef<any | null>(null);
  // eslint-disable-next-line no-undef
  const fieldQCodRef = useRef<any | null>(null);


  // /InternalRestApi/apiCustomJavaRequest/SaveRequest4MessageQueue?_PkField=Queue_Id&_PkValue=1858596
  
  const { isLoading: isXmlLoading, error: errorXml, res: resXml, refetch: refetchXml } = useSendXml(
    'SaveRequest4MessageQueue1',
    'post',
    `${process.env.REACT_APP_CUSTOM_API}/SaveRequest4MessageQueue`,
    {
      _PkField: 1,
      _PkValue: 1858596,
    },
    [],
    true,
  );

  return (
    <div id={`Q${recordId}`}>
      <div id="shownXmlReq">
        <textarea
          value={shownXmlReq}
          readOnly
          rows={NumLines}
          cols={100}
          ref={fieldQRef}
        />
        <br/>
        <Button
          variant="contained"
          startIcon={<Save />}
          onClick={() => {
            console.log("ref1", fieldQRef.current.value);
          }}
        >Сохранить секцию шаблона</Button>
      </div>
      <hr />
      <div id="shownXmlRes">
        <textarea
          value={shownXmlRes}
          readOnly
          rows={NumLinesR}
          cols={100}
          ref={fieldQCodRef}
        />
        <br/>
        <Button
          variant="contained"
          startIcon={<Save />}
          onClick={() => {
            console.log("ref2", fieldQCodRef.current.value);
          }}
        >Сохранить секцию шаблона</Button>
      </div>
    </div>
  );
};

const useQueryFetch4MessageQueueLog = () => {
  const record = useRecordContext();
  const notify = useNotify();
  // const [loading, setLoading] = useState(false);
  // - заполнено чисто для отладки, что бы сначала без бека посмотреть как XML рендерится
  const [shownXmlReq, setXmlReq] = useState(isPreLoading);
  const [shownXmlRes, setXmlRes] = useState(isPreLoading);
  // const shownRowId= `${record.id}`;
  // var shownString: String | undefined | null ;
  // setLoading(false);
  //console.log("fetchRequest4MessageQueueLog: check loading=", loading);
  // if ( !loading ) { setLoading(true);}
  let { isLoading, error, data } = useQuery(
    ["QueueLogRequest", record.id],
    () =>
      fetch(`${getRequest4MessageQueueLogUrl}?RowId=${record.id}`)
        .then((response) => response.text())
        .then((responseString) => {
          setXmlReq(responseString);
          // setLoading(true);
          console.warn(`useQueryFetch4MessageQueueLog fetch: ${shownXmlReq}`);
        })
        .catch((e) => {
          notify(
            `Error: GetRequest_Body4Message not fetched: ${e.toString()}`,
            { type: "error" }
          );
        })
  );
  if (!isLoading) {
    // console.log(
    //   "useQueryFetch4MessageQueueLog: before return shownXmlReq=",
    //   shownXmlReq
    // );
  }
  const NumTextAreaRors: number = Math.round(shownXmlReq.length / 40) + 1;
  let NumLines: number = shownXmlReq.split(/\n/).length;
  if (NumLines < NumTextAreaRors) NumLines = NumTextAreaRors;

  const result = useQuery(["QueueLogResponse", record.id], () =>
    fetch(`${GetResponse4MessageQueueLogUrl}?RowId=${record.id}`)
      .then((response) => response.text())
      .then((responseString) => {
        setXmlRes(responseString);
        // setLoading(true);
        console.warn(`useQueryFetch4MessageQueueLog fetch: ${shownXmlRes}`);
      })
      .catch((e) => {
        notify(`Error: GetRequest_Body4Message not fetched: ${e.toString()}`, {
          type: "error",
        });
      })
  );
  if (!result.isLoading) {
    // console.log(
    //   "useQueryFetch4MessageQueueLog: before return shownXmlStr=",
    //   shownXmlRes
    // );
  }
  const NumTextAreaRows = Math.round(shownXmlRes.length / 40) + 1;
  let NumLinesR = shownXmlRes.split(/\n/).length;
  if (NumLinesR < NumTextAreaRows) NumLines = NumTextAreaRows;

  return (
    <div id={`#${record.id}`}>
      <div id="shownXmlReq">
        <textarea value={shownXmlReq} readOnly rows={NumLines} cols={100} />
      </div>
      <div id="shownXmlRes">
        <textarea value={shownXmlRes} readOnly rows={NumLinesR} cols={100} />
      </div>
    </div>
  );
};

// const fetchRequest4MessageQueueLog = () => {
//   const { id } = useParams<{id: string}>();
//   const record = useRecordContext();
//   //const dispatch = useDispatch();
//   //const redirect = useRedirect();
//   console.log('record', record);
//   const notify = useNotify();
//   // const [loading, setLoading] = useState(false);
//   // - заполнено чисто для отладки, что бы сначала без бека посмотреть как XML рендерится
//   const [shownXmlStr, setXmlStr] = useState(
//     "\t\t<Context>\n" +
//       "\t\t\t\t<EventInitiator>GET.HRMS</EventInitiator>\n" +
//       "\t\t\t\t<EventKey>-1</EventKey>\n" +
//       "\t\t\t\t<Source>GET.HRMS</Source>\n" +
//       "\t\t\t\t<Destination>HRMS</Destination>\n" +
//       "\t\t\t\t<BusOperationId>3301</BusOperationId>\n" +
//       "\t\t</Context>"
//   );
//   const shownRowId = `${record.id}`;
//   var shownString: String | undefined | null;
//   // setLoading(false);
//   //console.log("fetchRequest4MessageQueueLog: check loading=", loading);
//   // if ( !loading ) { setLoading(true);}

//   fetch(`${getRequest4MessageQueueLogUrl}?RowId=${record.id}`)
//     .then((response) => response.text())
//     .then((responseString) => {
//       // shownString = shownString;
//       // [shownXmlStr , setXmlStr] = useState<responseXmlStr>({shownXmlStr: responseString} );
//       setXmlStr(responseString);
//       // setLoading(true);
//       console.warn(`shownXmlStr: ${shownXmlStr}`);
//       // console.log(xmlDoc)
//     })
//     .catch((e) => {
//       notify(`Error: GetRequest_Body4Message not fetched: ${e.toString()}`, {
//         type: "error",
//       });
//     });

//   // console.log("fetchRequest4MessageQueueLog: before return loading=", loading);
//   // console.log(shownXmlStr)
//   const NumTextAreaRors: number = Math.round(shownXmlStr.length / 40) + 1;
//   let NumLines: number = shownXmlStr.split(/\n/).length;
//   if (NumLines < NumTextAreaRors) NumLines = NumTextAreaRors;

//   return (
//     <div id={`#${record.id}`}>
//       {" "}
//       <textarea value={shownXmlStr} readOnly rows={NumLines} cols={100} />
//     </div>
//   );
// };

const MessageQueueFilter = (props: any) => (
  <Filter {...props}>
    <NumberInput
      label="# Queue_Id"
      source="Queue_Id"
      alwaysOn
      name="Queue_Id"
    />
    <NumberInput
      label="№ операции"
      source="Operation_Id"
      alwaysOn
      name="Operation_Id"
    />
    {/*<BooleanInput source="is_published" alwaysOn />*/}
    {/*<TextInput source="Template_Dir" defaultValue="IN" />*/}
    <SelectInput
      label="Состояние"
      source="Queue_Direction"
      alwaysOn
      choices={QueueDirectionChoices}
    />

    <SelectInput
      label="Сколько записей"
      source="Rownum"
      alwaysOn
      name="Rownum"
      choices={[
        { id: "100", name: "100" },
        { id: "200", name: "300" },
        { id: "600", name: "600" },
        { id: "1500", name: "1500" },
      ]}
    />
    <DateInput
      source="Queue_Date"
      label="Дата постановкм"
      alwaysOn
      name="Queue_Date"
    />
    <TextInput
      source="Queue_Msgdirection_Cod"
      label="Система"
      alwaysOn
      name="Queue_Msgdirection_Cod"
    />
    <TextInput
      source="Msg_Type"
      label="Тип сообщения"
      alwaysOn
      name="Msg_Type"
    />
      <NumberInput
          label="№ объекта"
          source="Perform_Object_Id"
          alwaysOn
          name="Perform_Object_Id"
      />
  </Filter>
);

export const MessageQueueEdit = (props: any) => {
  const classes = useStyles();
  const { record } = useEditController(props);
  // const {
  //   defaultTitle, // the translated title based on the resource, e.g. 'Post #123'
  //   error, // error returned by dataProvider when it failed to fetch the record. Useful if you want to adapt the view instead of just showing a notification using the `onFailure` side effect.
  //   record, // record fetched via dataProvider.getOne() based on the id from the location
  //   redirect, // the default redirection route. Defaults to 'list'
  //   resource, // the resource name, deduced from the location. e.g. 'posts'
  //   save, // the update callback, to be passed to the underlying form as submit handler
  //   saving, // boolean that becomes true when the dataProvider is called to update the record
  // } = controllerProps;

  // filter={{  Interface_Id: row.Interface_Id }}
  return (
    <Edit title="Изменяем параметры сообщения">
      <TabbedForm syncWithLocation>
          <FormTab label="Параметры сообщения">
              <NumberInput disabled
                           source="id" // options={{ useGrouping: false }}
                           label="#Запроса"
                           formClassName={classes.inlineBlock}
              />
              <DateTimeInput disabled
                             source="Queue_Date"
                             label="Дата постановкм"
                             formClassName={classes.inlineBlock}
                             helperText="Дата постановки сообщения в очередь на обработку"
              />
              <div>
                  <NumberInput disabled
                               source="Operation_Id"
                               label="№ операции"
                               formClassName={classes.inlineBlock} helperText="Идентификатор типа операции"
                  />
                  <TextInput disabled source="Msg_Type" label="Тип сообщения"/>

              </div>

              <SelectInput
                  label="Состояние"
                  source="Queue_Direction"
                  alwaysOn
                  choices={QueueDirectionChoices}
                  formClassName={classes.inlineBlock} helperText="Статус состояния сообщения"
              />
              <TextInput
                  source="Msg_Reason"
                  label="Результат передачи"
                  formClassName={classes.inlineBlock} fullWidth multiline
              />
              <TextInput
                  source="Msg_Result"
                  label="Результат обработки"
                  formClassName={classes.inlineBlock} fullWidth multiline helperText="сообщение прикладного обработчика"
              />

              <div>
                  <TextInput disabled
                             source="Queue_Msgdirection_Cod"
                             label="Система"
                             formClassName={classes.inlineBlock}
                  />
                  <DateTimeInput disabled
                                 source="Msg_Date"
                                 label="Msg_Date"
                                 formClassName={classes.inlineBlock}
                                 helperText="Дата-время обработки сообщения(последнее изменение)"
                  />
                  <NumberInput
                      source="Msg_Infostreamid"
                      label="Обработчик :"
                      formClassName={classes.inlineBlock} helperText="№ потока-Обработчик для исходящих сообщений"
                  />
              </div>
              <div>
                  <TextInput disabled
                             source="Prev_Queue_Direction"
                             label="Предыдущий статус сообщения"
                             formClassName={classes.inlineBlock}
                  />
                  <DateTimeInput disabled
                                 source="Prev_Msg_Date"
                                 label="Время в Предыдущем статусе"
                                 formClassName={classes.inlineBlock}
                                 helperText="Дата-время предыдущего статуса сообщения"
                  />
              </div>
          </FormTab>
          <FormTab label="Журнал отправки сообщений">
              <ReferenceManyField reference="MessageQueueLog" target="Queue_Id">
                  <Datagrid
                      isRowSelectable={() => false}
                      rowClick="expand"
                      expand={useQueryFetch4MessageQueueLog}
                      isRowExpandable={() => true}
                  >
                      <TextField source="id" label="RowId журнала" />
              <TextField source="Req_Dt" label="Время запроса" />
              <TextField source="Resp_Dt" label="Время ответа" />
            </Datagrid>
          </ReferenceManyField>
        </FormTab>
        <FormTab label="Key-Value-ParenKey">
          <ReferenceManyField reference="MessageQueueDet" target="Queue_Id" perPage={50}>
            <Datagrid isRowSelectable={() => false}>
              <NumberField source="Tag_Id" label="имя элемента в собщениии" />
              <TextField source="Tag_Value" label="содержимое" />
              <TextField
                source="Tag_Num"
                label="идентификатор элемента в собщениии"
              />
              <TextField
                source="Tag_Par_Num"
                label="Родительский идентификатор элемента в собщениии"
              />
            </Datagrid>
          </ReferenceManyField>
        </FormTab>
        <FormTab label={`Body-Confirmation Message# ${record?.id}`}>
          <div>{useQueryFetch4MessageQueueBody(record?.id)}</div>
        </FormTab>
      </TabbedForm>
    </Edit>
  );
};

const MessagePanel = () => {
  //const { id } = useParams();
  const record = useRecordContext();
  console.info("MessagePanel=", record);
  //console.warn('MessagePanel resource=', resource )
  let shownString: string = record.Msg_Reason.toString(); // + ' (' + record.Msg_Result + ')';
  //const htmlString: string = shownString.toString();
  return <div dangerouslySetInnerHTML={{ __html: shownString }} />;
};
export const MessageQueue = (props: any) => (
  <List
    {...props}
    title="Запросы к системам"
    perPage={25}
    filters={<MessageQueueFilter />}
    sort={{ field: "Queue_Id", order: "DESC" }}
  >
    <Datagrid
      rowClick="expand"
      expand={MessagePanel}
      isRowExpandable={() => true}
      isRowSelectable={(row) => row.id < 0}
      optimized
    >
      <EditButton label="Детали"/>
      <NumberField
        source="id"
        options={{ useGrouping: false }}
        label="Queue_Id"
      />
      <DateField source="Queue_Date" label="Дата постановкм" showTime />
      <NumberField source="Operation_Id" label="№ операции" />
      <TextField source="Queue_Direction" label="Состояние" />
      <TextField source="Msg_Type" label="Тип сообщения" />
      <DateField source="Msg_Date" label="Дата обработки" showTime />
        <NumberField source="Perform_Object_Id" label="№ объекта" />

      <TextField source="Queue_Msgdirection_Cod" label="Система" />

    </Datagrid>
  </List>
);

// <TextField source="Msg_Reason" label='Msg_Reason'/>
// <TextField source="Msg_Result" label='Msg_Result' sortable={false} />
