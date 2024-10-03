import { useQuery } from "react-query";
import {
  Datagrid,
  TextField,
  NumberField,
  TextInput,
  SelectInput,
  NumberInput,
  DateTimeInput,
  DateInput,
  useEditController,
  Edit,
  TabbedForm,
  // FormTab,
  ReferenceManyField,
  useNotify,
  useRecordContext,
  Identifier,
  useEditContext,
} from "react-admin";
import Button from '@mui/material/Button';
import { Save } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import { useState, useRef, useEffect } from "react";
import { useSendXml } from "../../services/use-send-xml";
// import { useSendXml } from "../../services/use-send-xml";

const useStyles = makeStyles({
  inlineBlock: { display: "inline-flex", marginRight: "1rem" },
});

const getRequest4MessageQueueLogUrl = `${process.env.REACT_APP_CUSTOM_API}/GetRequest4MessageQueueLog`;
const GetResponse4MessageQueueLogUrl = `${process.env.REACT_APP_CUSTOM_API}/GetResponse4MessageQueueLog`;
const GetRequest_Body4MessageUrl = `${process.env.REACT_APP_CUSTOM_API}/GetRequest_Body4Message`;
const GetRequest_Confirmation4MessageUrl = `${process.env.REACT_APP_CUSTOM_API}/GetRequest_Confirmation4Message`;
const MessageTemplatesSaveXMLfieldQRef = `${process.env.REACT_APP_CUSTOM_API}/SaveRequest4MessageQueue`;
const MessageTemplatesSaveXMLfielCodedQRef = `${process.env.REACT_APP_CUSTOM_API}/ReplaceConfirmation4MessageQueue`;

const QueueDirectionСhoices = [
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

const useQueryFetch4MessageQueueBody = (recordId: Identifier) => {
  const notify = useNotify();
  const [initXmlReq, setInitXmlReq] = useState(isPreLoading);
  const [initXmlRes, setInitXmlRes] = useState(isPreLoading);
  const [shownXmlReq, setXmlReq] = useState(isPreLoading);
  const [shownXmlRes, setXmlRes] = useState(isPreLoading);
  const localStorageusrToken: string | undefined | null = sessionStorage.getItem("_usrToken");
  const TemplatesSaveXMLQry: string = `?Queue_Id=${recordId}&_usrToken=${localStorageusrToken}`;
  const [disbl, setDisbl] = useState(true);
  const [disblCode, setDisblCode] = useState(true);

  const { isLoading, error, data, refetch } = useQuery(
    ["Body4MessageRequest", recordId],
    () =>
      fetch(`${GetRequest_Body4MessageUrl}?Queue_Id=${recordId}`)
        .then((response) => response.text())
        .then((responseString) => {
          setXmlReq(responseString);
          setInitXmlReq(responseString);
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
        setInitXmlRes(responseString);
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


  const { isLoading: saveXmlIsLoading, error: saveXmlError, res: saveXmlData, refetch: xmlDataRefetch } = useSendXml(
    `SaveXMLfieldQRef${recordId}`,
    'post',
    `${MessageTemplatesSaveXMLfieldQRef}${TemplatesSaveXMLQry}`,
    `${shownXmlReq}`,
    [],
    true,
  );
  
  const { isLoading: saveXmlCodeIsLoading, error: saveXmlCodeError, res: saveXmlCodeData, refetch: xmlCodeDataRefetch } = useSendXml(
    `SaveXMLfieldQCodRef${recordId}`,
    'post',
    `${MessageTemplatesSaveXMLfielCodedQRef}${TemplatesSaveXMLQry}`,
    `${shownXmlRes}`,
    [],
    true,
  );


  useEffect(() => {
    console.log('saveXmlError', saveXmlError, saveXmlData, saveXmlIsLoading);
    if (!saveXmlIsLoading && saveXmlData) {
        refetch();
        // editRefetch();
    }

  }, [saveXmlIsLoading, saveXmlData, saveXmlError])

  useEffect(() => {
    console.log('saveXmlError22', saveXmlCodeError, saveXmlCodeData, saveXmlIsLoading);
    if (!saveXmlCodeIsLoading && saveXmlCodeData) {
      console.log('aaa');
      result.refetch();
        // editRefetch();
    }

  }, [saveXmlCodeIsLoading, saveXmlCodeData, saveXmlCodeError])

  const clickHandler = () => {
    xmlDataRefetch();
  }

  const click2Handler = () => {
    xmlCodeDataRefetch();
  }

  const saveXMLHandler = (data: any) => {
    setXmlReq(data.target.value);
  };

  const saveXML2Handler = (data: any) => {
    setXmlRes(data.target.value);
  };
  const a = fieldQRef.current;
  const b = fieldQCodRef.current;

  useEffect(() => {
    setDisbl(Boolean(initXmlReq.replace(/[^a-zA-Z]/g, "") === (a as unknown as any)?.value.replace(/[^a-zA-Z]/g, "") || (a as unknown as any)?.value.replace(/[^a-zA-Z]/g, "") === ''));
  },[initXmlReq, a, shownXmlReq]);

  useEffect(() => {
    setDisblCode(Boolean(initXmlRes.replace(/[^a-zA-Z]/g, "") === (b as unknown as any)?.value.replace(/[^a-zA-Z]/g, "") || (a as unknown as any)?.value.replace(/[^a-zA-Z]/g, "") === ''));
  },[initXmlRes, b, shownXmlRes]);


  return (
    <div id={`Q${recordId}`}>
      <div id={`shownXmlReq${recordId}`}>
        <textarea
          value={shownXmlReq}
          readOnly={false}
          rows={NumLines}
          cols={100}
          ref={fieldQRef}
          onChange={saveXMLHandler}
        />
        <br />
        <Button
          variant="contained"
          startIcon={<Save />}
          disabled={disbl}
          onClick={() => {
            console.log("ref1", fieldQRef.current.value);
            clickHandler();
          }}
        >Заменить содержимое запроса</Button>
      </div>
      <hr />
      <div id="shownXmlRes">
        <textarea
          value={shownXmlRes}
          readOnly={false}
          rows={NumLinesR}
          cols={100}
          ref={fieldQCodRef}
          onChange={saveXML2Handler}
        />
        <br />
        <Button
          variant="contained"
          startIcon={<Save />}
          disabled={disblCode}
          onClick={() => {
            console.log("ref2", fieldQCodRef.current.value);
            click2Handler();
          }}
        >Заменить ответ на запрос</Button>
      </div>
    </div>
  );
};

const useQueryFetch4MessageQueueLog = () => {
  const record = useRecordContext();
  const notify = useNotify();
  // - заполнено чисто для отладки, что бы сначала без бека посмотреть как XML рендерится
  const [shownXmlReq, setXmlReq] = useState(isPreLoading);
  const [shownXmlRes, setXmlRes] = useState(isPreLoading);

  const { isLoading, error, data } = useQuery(
    ["QueueLogRequest", record.id],
    () =>
     // fetch(`${getRequest4MessageQueueLogUrl}?RowId=${record.id}`)
        fetch(`${GetResponse4MessageQueueLogUrl}?RowId=${window.btoa(String(record.id))}`)
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
    //fetch(`${GetResponse4MessageQueueLogUrl}?RowId=${record.id}`)
      fetch(`${GetResponse4MessageQueueLogUrl}?RowId=${window.btoa(String(record.id))}`)
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

  return (
    <Edit title="Изменяем параметры сообщения">
      <TabbedForm syncWithLocation>
        <TabbedForm.Tab label="Параметры сообщения">
          <div>
            <NumberInput disabled
                         source="id"
                // options={{ useGrouping: false }}
                         label="#Запроса"
                         formClassName={classes.inlineBlock}
            />
            <TextInput   disabled
                           source="Queue_Date"
                           label="Дата постановкм"
                           formClassName={classes.inlineBlock}
                           helperText="Дата постановки сообщения в очередь на обработку"
            />
            <div>
              <NumberInput disabled
                           source="Operation_Id"
                           label="№ операции"
                           formClassName={classes.inlineBlock} helperText="Идентификатор типа операции (число)"
              />
              <TextInput disabled source="Msg_Type" label="Тип сообщения"
                         formClassName={classes.inlineBlock} helperText="Символьная метка типа операции (метод)"
              />
              <NumberInput
                  source="Msg_Status"
                  label="Статус:"
                  formClassName={classes.inlineBlock} helperText="код завершения обработки сообщения"
              />
            </div>

            <SelectInput
                label="Состояние"
                source="Queue_Direction"
                alwaysOn
                choices={QueueDirectionСhoices}
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
              <TextInput disabled
                             source="Msg_Date"
                             label="Время обработки"
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
              <TextInput disabled
                             source="Prev_Msg_Date"
                             label="Время в Предыдущем статусе"
                             formClassName={classes.inlineBlock}
                             helperText="Дата-время предыдущего статуса сообщения"
              />
              <TextInput disabled
                         source="Queue_Create_Date"
                         label="Время в создания события"
                         formClassName={classes.inlineBlock}
                         helperText="Дата-время создания события (добавления записи)"
              />

            </div>
          </div>
        </TabbedForm.Tab>
        <TabbedForm.Tab label="Журнал отправки сообщений">
          <div>
            <ReferenceManyField reference="MessageQueueLog" target="Queue_Id">
              <Datagrid
                  isRowSelectable={() => false}
                  rowClick="expand"
                  expand={useQueryFetch4MessageQueueLog}
                  isRowExpandable={() => true}
              >
                <TextField source="id" label="RowId журнала"/>
                <TextField source="Req_Dt" label="Время запроса"/>
                <TextField source="Resp_Dt" label="Время ответа"/>
              </Datagrid>
            </ReferenceManyField>
          </div>
        </TabbedForm.Tab>
        <TabbedForm.Tab label="Key-Value-ParenKey">
          <div>
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
          </div>
        </TabbedForm.Tab>
        <TabbedForm.Tab label={`Body-Confirmation Message# ${record?.id}`}>
          <div>{useQueryFetch4MessageQueueBody(record?.id)}</div>
        </TabbedForm.Tab>
      </TabbedForm>
    </Edit>
  );
};
