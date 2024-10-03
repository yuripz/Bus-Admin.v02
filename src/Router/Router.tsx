import React from "react";
import { Admin, Resource } from "react-admin";
import AllInboxOutlinedIcon from "@mui/icons-material/AllInboxOutlined";
//import { usePermissions } from 'react-admin';
import ViewListIcon from "@mui/icons-material/ViewList";
import CallToActionTwoToneIcon from "@mui/icons-material/CallToActionTwoTone";
import AppsIcon from "@mui/icons-material/Apps";
import HotelIcon from '@mui/icons-material/Hotel';
import BedroomChildIcon from '@mui/icons-material/BedroomChild';
import BedroomChildOutlinedIcon from '@mui/icons-material/BedroomChildOutlined';
import MasksOutlinedIcon from '@mui/icons-material/MasksOutlined';
import MasksIcon from '@mui/icons-material/Masks';
import TableChartIcon from "@mui/icons-material/TableChart";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import UserIcon from "@mui/icons-material/People";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import FlipCameraAndroidIcon from "@mui/icons-material/FlipCameraAndroid";
import AutoAwesomeMotionIcon from "@mui/icons-material/AutoAwesomeMotion";
import CallSplitIcon from "@mui/icons-material/CallSplit";
import BusinessIcon from "@mui/icons-material/Business";
import CoPresentIcon from "@mui/icons-material/CoPresent";
import ContactsIcon from "@mui/icons-material/Contacts";
import EngineeringIcon from "@mui/icons-material/Engineering";
import MediationIcon from "@mui/icons-material/Mediation";
import DynamicFormIcon from "@mui/icons-material/DynamicForm";
// eslint-disable-next-line import/no-extraneous-dependencies
import polyglotI18nProvider from 'ra-i18n-polyglot';
import raDataJsonServer from "../data-provider/raDataJsonServer";
import authProvider from "../authProvider";
import Dashboard from "../Dashboard";
import russianMessages from "../ra-language-russian";
import {
  UserList,
  AUUsersEdit,
  AUUsersCreate,
  MessageTypes,
  MessageTypesCreate,
  MessageTypesEdit,
  MessageIntefaces,
  MessageIntefaceCreate,
  MessageIntefaceEdit,
  MessageDirections,
  MessageQueue,
  MessageQueueEdit,

} from "../components";

import {
  MessageDirectionsCreate,
  MessageDirectionsEdit,
} from "../components/MessageDirections";

import { MessageTemplates } from "../components/MessageTemplates/MessageTemplates";
import { MessageTemplateEdit } from "../components/MessageTemplates/MessageTemplateEdit";

import { RouterConfiguration } from "../constants/router-cfg";
// type x_permissions = string;
const dataProvider = raDataJsonServer(`${process.env.REACT_APP_APIURL}`);

// @ts-ignore
const i18nProvider = polyglotI18nProvider(() => russianMessages, 'ru', { allowMissing: true }) ;
const isDoShowHospital = process.env.REACT_APP_IS_DO_SHOW_HOSPITAL;

const doShowHospital= ( isShowHospital: boolean ) => {
  if ( isShowHospital )
  return (
      <Resource
          name="AU_Users"
          options={{ label: "Пользователи" }}
          list={UserList}
          edit={AUUsersEdit}
          create={AUUsersCreate}
          icon={UserIcon}
      />
  );
  else return ( <div />)
}
const Router = () => {
  //const { loaded, permissions } = usePermissions();
  const RoleLabel = localStorage.getItem("Role_Label");
  //console.error( "try usePermissions", {permissions});
  //console.error( "is loaded", {loaded});
  let isShowHospital: boolean = false;
  console.log({isDoShowHospital}, process.env.REACT_APP_IS_DO_SHOW_HOSPITAL);
  if ( isDoShowHospital ==='true') isShowHospital = false;
   else isShowHospital = true;

  console.warn("show RoleLabel", RoleLabel);
  console.warn("show isDoShowHospital", isDoShowHospital);
  console.warn("show isShowHospital", isShowHospital);
  if ( isShowHospital === true )
  return (
    <Admin
      disableTelemetry
      dataProvider={dataProvider}
      authProvider={authProvider}
      i18nProvider={i18nProvider}
      dashboard={Dashboard}
      title="toDo"
    >
      { RouterConfiguration.AU_Users && <Resource
        name="AU_Users"
        options={{ label: "Пользователи" }}
        list={UserList}
        edit={AUUsersEdit}
        create={AUUsersCreate}
        icon={UserIcon}
      />
      }

    { RouterConfiguration.MessageQueue && <Resource
        name="MessageQueue"
        options={{ label: "Очереди" }}
        list={MessageQueue}
        edit={MessageQueueEdit}
        icon={AllInboxOutlinedIcon}
      />
    }
    { RouterConfiguration.MessageIntefaces && <Resource
        name="MessageIntefaces"
        options={{ label: "Интерфейсы" }}
        list={MessageIntefaces}
        edit={MessageIntefaceEdit}
        create={MessageIntefaceCreate}
        icon={MediationIcon}
      />
    }
    { RouterConfiguration.MessageTypes && <Resource
        name="MessageTypes"
        options={{ label: "Типы" }}
        list={MessageTypes}
        edit={MessageTypesEdit}
        create={MessageTypesCreate}
        icon={SyncAltIcon}
      />
    }
    { RouterConfiguration.MessageTemplates && <Resource
        name="MessageTemplates"
        options={{ label: "Шаблоны" }}
        list={MessageTemplates}
        edit={MessageTemplateEdit}
        icon={DynamicFormIcon}
      />
    }
    { RouterConfiguration.MessageDirections && <Resource
        name="MessageDirections"
        options={{ label: "Системы" }}
        list={MessageDirections}
        edit={MessageDirectionsEdit}
        create={MessageDirectionsCreate}
        icon={CallToActionTwoToneIcon}
      />
    }
    { RouterConfiguration.MessageQueueLog && <Resource
        name="MessageQueueLog"
        options={{ label: "MessageQueueLog" }}
        icon={TableChartIcon}
      />
      }
      { RouterConfiguration.MessageQueueDet && <Resource
        name="MessageQueueDet"
        options={{ label: "MessageQueueDet" }}
        icon={TableChartIcon}
      />
      }
      { RouterConfiguration.MessageTemplatesEntry && <Resource
        name="MessageTemplatesEntry"
        options={{ label: "MessageTemplatesEntry" }}
        icon={TableChartIcon}
      />
      }
      { RouterConfiguration.Message_Queue_4_Link && <Resource
        name="Message_Queue_4_Link"
      />
      }
    </Admin>
  );
  else
    return (
        <Admin
            disableTelemetry
            dataProvider={dataProvider}
            authProvider={authProvider}
            i18nProvider={i18nProvider}
            dashboard={Dashboard}
            title="toDo"
        >
          <Resource
              name="AU_Users"
              options={{ label: "Пользователи" }}
              list={UserList}
              edit={AUUsersEdit}
              create={AUUsersCreate}
              icon={UserIcon}
          />
          <Resource
              name="MessageQueue"
              options={{ label: "Очереди" }}
              list={MessageQueue}
              edit={MessageQueueEdit}
              icon={AllInboxOutlinedIcon}
          />
          <Resource
              name="MessageIntefaces"
              options={{ label: "Интерфейсы" }}
              list={MessageIntefaces}
              edit={MessageIntefaceEdit}
              create={MessageIntefaceCreate}
              icon={MediationIcon}
          />
          <Resource
              name="MessageTypes"
              options={{ label: "Типы" }}
              list={MessageTypes}
              edit={MessageTypesEdit}
              create={MessageTypesCreate}
              icon={SyncAltIcon}
          />
          <Resource
              name="MessageTemplates"
              options={{ label: "Шаблоны" }}
              list={MessageTemplates}
              edit={MessageTemplateEdit}
              icon={DynamicFormIcon}
          />
          <Resource
              name="MessageDirections"
              options={{ label: "Системы" }}
              list={MessageDirections}
              edit={MessageDirectionsEdit}
              create={MessageDirectionsCreate}
              icon={CallToActionTwoToneIcon}
          />
          <Resource
              name="MessageQueueLog"
              options={{ label: "MessageQueueLog" }}
              icon={TableChartIcon}
          />
          <Resource
              name="MessageQueueDet"
              options={{ label: "MessageQueueDet" }}
              icon={TableChartIcon}
          />
          <Resource
              name="MessageTemplatesEntry"
              options={{ label: "MessageTemplatesEntry" }}
              icon={TableChartIcon}
          />

          <Resource
              name="Message_Queue_4_Link"
          />
        </Admin>
    );
};

export { Router };
