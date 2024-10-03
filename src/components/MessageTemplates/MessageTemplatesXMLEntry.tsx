import { useEffect, useState, useRef } from 'react';
import {  Identifier, useRecordContext, useNotify, useEditContext } from "react-admin";
import { useQuery } from "react-query";
import Button from '@mui/material/Button';
import { Save } from "@mui/icons-material";
import { useSendXml } from "../../services/use-send-xml";

const MessageTemplatesGetConfigUrl = `${process.env.REACT_APP_CUSTOM_API}/MessageTemplatesGetConfig`;
const MessageTemplatesSaveXML = `${process.env.REACT_APP_CUSTOM_API}/MessageTemplatesSaveConfig`;
const sTemplate: string = "";

export const MessageTemplatesXMLEntry = () => {
    const recordId: Identifier = 0;
    const Template = useRecordContext();
    const notify = useNotify();
    if (!Template) return null;
    const localStorageusrToken: string | undefined | null =
    sessionStorage.getItem("_usrToken");
    const TemplatesGetConfigQryParam = Template.id.toString().split("-@-");
    const TemplatesGetConfigQry: string = `?Template_Id=${TemplatesGetConfigQryParam[0]}&ConfigEntry=${TemplatesGetConfigQryParam[1]}`;
    const TemplatesSaveXMLQry: string = `?Template_Id=${TemplatesGetConfigQryParam[0]}&ConfigEntry=${TemplatesGetConfigQryParam[1]}&_usrToken=${localStorageusrToken}`;

    const { refetch: editRefetch, data: editData } = useEditContext();
    const textAreaRef = useRef(null);

    const [shownXmlStr, setXmlStr] = useState(sTemplate);
    const [initXmlStr, setInitXmlStr] = useState(sTemplate);
    const [disbl, setDisbl] = useState(true);

    const { isLoading, error, data, refetch } = useQuery(
      [`Body4MessageRequest${recordId}`, Template.id],
      () =>
        fetch(`${MessageTemplatesGetConfigUrl}${TemplatesGetConfigQry}`)
          .then((response) => response.text())
          .then((responseString) => {
                setXmlStr(responseString);
                setInitXmlStr(responseString);
            })
          .catch((e) => {
            notify(
              `Error: fetchMessageTemplatesEntry not fetched: ${e.toString()}`,
              { type: "error" }
            );
          })
    );
    
    const { isLoading: saveXmlIsLoading, error: saveXmlError, res: saveXmlData, refetch: xmlDataRefetch } = useSendXml(
      `SaveXML${recordId}${Template.id}`,
      'post',
      `${MessageTemplatesSaveXML}${TemplatesSaveXMLQry}`,
      `${shownXmlStr}`,
      [],
      true,
    );

    useEffect(() => {
        console.log('saveXmlError', saveXmlError, saveXmlData, saveXmlIsLoading);
        if (!saveXmlIsLoading && saveXmlData) {
            refetch();
            editRefetch();
        }

    }, [saveXmlIsLoading, saveXmlData, saveXmlError])

    const clickHandler = () => {
        xmlDataRefetch();
      }

    const NumTextAreaRors: number = Math.round(shownXmlStr.length / 40) + 1;
    let NumLines: number = shownXmlStr.split(/\n/).length;
    if (NumLines < NumTextAreaRors) NumLines = NumTextAreaRors;

    const saveXMLHandler = (data: any) => {
        setXmlStr(data.target.value);
    };
    const a = textAreaRef.current;

    useEffect(() => {
        setDisbl(Boolean(initXmlStr.replace(/[^a-zA-Z]/g, "") === (a as unknown as any)?.value.replace(/[^a-zA-Z]/g, "") || (a as unknown as any)?.value.replace(/[^a-zA-Z]/g, "") === ''));
    },[initXmlStr, a, shownXmlStr]);

    return (!isLoading) ? (
      <div id={`${recordId}#${Template.id}`}>
        {" "}
        <textarea ref={textAreaRef} value={shownXmlStr} onChange={saveXMLHandler} readOnly={false} rows={NumLines} cols={100} />
        <br />
        <Button disabled={disbl} onClick={clickHandler} startIcon={<Save />} variant="contained">Сохранить секцию шаблона</Button>
      </div>) : <></>
    ;
}