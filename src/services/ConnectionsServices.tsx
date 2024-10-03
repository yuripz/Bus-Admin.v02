/* eslint-disable max-params */
import axios from "axios";
import { HTTPREQUEST, SQLREQUEST } from "../constants/mainInfo";
import {
  AuthType,
  WorkerType,
  ArmType,
  UserType,
  Order4QType,
  PlaceType,
  WorkerAllType,
  MessageQueue4LinkType,
  LinkedUnitQueueType,
  Unit_AllType,
  NamedListMemberType, TableauWorkerType,
} from "./ConnectionsServices.types";
/*eslint max-params: ["error", 6]*/

axios.interceptors.response.use(
  (response) => {
    const {
      data,
      data: { Response, Fault },
    } = response!;

    console.log('response: ', response);

    if (Response) {
      return Response;
    }

    if (Fault) {
      console.log('fault: ', response);
      const error = {
        resultCode: 77777,
        resultMessage: `Ошибка сервера: ${Fault.faultstring}`,
      };
      throw error;
    }

    return data;
  },
  (error) => {
    if (error && error.response) {

    console.log('err: ', error);

      const {
        response: {
          data: { Fault },
        },
      } = error!;
      if (Fault) {
        const error = {
          resultCode: 77777,
          resultMessage: `Ошибка сервера: ${Fault.faultstring}`,
        };
        throw error;
      }
    }
    const errorUnknown = {
      resultCode: 77777,
      resultMessage: `Ошибка сервера`,
    };
    throw errorUnknown;
  }
);

const Auth: AuthType = {
  login: (userName, password) => {
    const queryString = [`login=${userName}`, `password=${password}`].join("&");

    return axios.get(`${HTTPREQUEST}/do_Login_4_Token?${queryString}`);
  },
  logout: (token, usrId) =>
    axios.get(
      `${HTTPREQUEST}/do_Logout_4_Token?_usrToken=${token}&usrId=${usrId}&token=${token}`
    ),
  pause: (token, workerId4Next, vipValue) => {
    const priority = vipValue ? 1 : 0;

    const queryString = [
      `_usrToken=${token}`,
      `Priority=${priority}`,
      `worker_Id4Next=${workerId4Next}`,
    ].join("&");

    return axios.get(`${HTTPREQUEST}/Set_Executor_2_Pause?${queryString}`);
  },
  checkToken: (storedToken) =>
    axios.get(`${HTTPREQUEST}/do_Check_Token?_usrToken=${storedToken}`),
  checkUserRoleStatus: (token) =>
    axios.get(`${HTTPREQUEST}/Check_Work_Place?_usrToken=${token}`),
  resetPassword: (login, newPassword, token) => {
    const queryString = [
      `login=${login}`,
      `password=${newPassword}`,
      `_usrToken=${token}`,
    ].join("&");

    return axios.get(`${HTTPREQUEST}/Reset_User_Passw?${queryString}`);
  },
};

const User: UserType = {
  create: (params: any) => {
    const urlString = `${process.env.REACT_APP_HTTPREQUEST}/Create_User`;
    const arr: string[] = [];
    const query = { ...params };

    for (const [key, value] of Object.entries(query)) {
      const str = `${key}=${value}`;
      arr.push(str);
    }
    const queryString = arr.join("&");

    return axios.get(`${urlString}?${queryString}`);
  },
  edit: (params: any) => {
    const urlString = `${process.env.REACT_APP_HTTPREQUEST}/Set_User_Role`;
    const arr: string[] = [];
    const query = { ...params };

    for (const [key, value] of Object.entries(query)) {
      const str = `${key}=${value}`;
      arr.push(str);
    }
    const queryString = arr.join("&");

    return axios.get(`${urlString}?${queryString}`);
  },
  getOne: (userId, localStorageusrToken) => {
    const queryString = [
      `_PkField=Usr_Id`,
      `_PkValue=${userId}`,
      `_usrToken=${localStorageusrToken}`,
    ].join("&");

    return axios.get(`${SQLREQUEST}/AU_UsersGetOne?${queryString}`);
  },
  getWorkerPlaceList: (
    userId,
    token,
    end = 25,
    order = "ASC",
    sort = "Place_Id",
    start = 0
  ) => {
    const queryString = [
      `_Filter={
                "Usr_Id": ${userId},
            }`,
      `_end=${end}`,
      `_order=${order}`,
      `_sort=${sort}`,
      `_start=${start}`,
      `_usrToken=${token}`,
    ].join("&");

    return axios.get(
      `${SQLREQUEST}/Place2Woker_4_Usr_IdGetList?${queryString}`
    );
  },
  setWorkPlaceslist: (placeId, userId, isUsed, token) => {
    const queryString = [
      `Place_Id=${placeId}`,
      `Usr_ID=${userId}`,
      `Is_Used=${isUsed}`,
      `_usrToken=${token}`,
    ].join("&");

    return axios.get(`${HTTPREQUEST}/Put_Place_Id_4_Usr_Id?${queryString}`);
  },
};

const Order4Q: Order4QType = {
  getList: (
    queueDirection,
    token,
    end = 25,
    order = "ASC",
    sort = "Order_Id",
    start = 0
  ) => {
    const queryString = [
      `_Filter={
                "Queue_Direction": ${queueDirection},
            }`,
      `_end=${end}`,
      `_order=${order}`,
      `_sort=${sort}`,
      `_start=${start}`,
      `_usrToken=${token}`,
    ].join("&");

    return axios.get(`${SQLREQUEST}/Order_4_QGetList?${queryString}`);
  },
};

const LinkedUnitQueue: LinkedUnitQueueType = {
  add: (queue_id, id, isAlternative, token) => {
    const queryString = [
      `_usrToken=${token}`,
    ].join("&");
    const data = {
      linked_queue_id: queue_id,
      queue_id: id,
      is_alternative: isAlternative,
    };

    return axios.post(`${SQLREQUEST}/Linked_Unit_QueueAdd?${queryString}`, data);
  },
};

const NamedListMember: NamedListMemberType = {
  add: (unitId, listId, token) => {
    const queryString = [
      `_usrToken=${token}`,
    ].join("&");
    const data = {
      Unit_Id: unitId,
      List_Id: listId,
    };

    return axios.post(`${SQLREQUEST}/Named_List_MemberAdd?${queryString}`, data);
  },
};

const Unit_All: Unit_AllType = {
  getList: (
    token, 
    end = 25,
    order = "ASC",
    sort = "Unit_Id",
    start = 0
    ) => {
    const queryString = [
      `_Filter={}`,
      `_end=${end}`,
      `_order=${order}`,
      `_sort=${sort}`,
      `_start=${start}`,
      `_usrToken=${token}`,
    ].join("&");

    return axios.get(`${SQLREQUEST}/Unit_AllGetList?${queryString}`);
  }
}

// const MessageQueueForLinkGetList = {
//   getList
// }

const MessageQueue4Link: MessageQueue4LinkType = {
  getList: (
    linkUnitQueueId,
    token,
    end = 25,
    order = "ASC",
    sort = "Order_Id",
    start = 0
  ) => {
    const queryString = [
      `_Filter={
          "Link_Unit_Queue_Id": ${linkUnitQueueId},
        }`,
      `_end=${end}`,
      `_order=${order}`,
      `_sort=${sort}`,
      `_start=${start}`,
      `_usrToken=${token}`,
    ].join("&");

    return axios.get(
      `${SQLREQUEST}/Message_Queue_4_LinkGetList?${queryString}`
    );
  },
};

const TableauWorker: TableauWorkerType = {
  getList: (
      tableauWorkerId,
      token,
      end = 25,
      order = "ASC",
      sort = "Order_Id",
      start = 0
  ) => {
    const queryString = [
      `_Filter={
          "Tableau_Worker_Id": ${tableauWorkerId},
        }`,
      `_end=${end}`,
      `_order=${order}`,
      `_sort=${sort}`,
      `_start=${start}`,
      `_usrToken=${token}`,
    ].join("&");

    return axios.get(
        `${SQLREQUEST}/Tableau_WorkerGetList?${queryString}`
    );
  },
};

const Place: PlaceType = {
  create: (params: any) => {
    const urlString = `${process.env.REACT_APP_HTTPREQUEST}/Create_Place`;
    const arr: string[] = [];
    const query = { ...params };

    for (const [key, value] of Object.entries(query)) {
      const str = `${key}=${value}`;
      arr.push(str);
    }
    const queryString = arr.join("&");

    return axios.get(`${urlString}?${queryString}`);
  },
  edit: (params: any) => {
    const urlString = `${process.env.REACT_APP_HTTPREQUEST}/Upd_Place`;
    const arr: string[] = [];
    const query = { ...params };

    for (const [key, value] of Object.entries(query)) {
      const str = `${key}=${value}`;
      arr.push(str);
    }
    const queryString = arr.join("&");

    return axios.get(`${urlString}?${queryString}`);
  },
  getOne: (placeId, localStorageusrToken) => {
    const queryString = [
      `_PkField=Place_Id`,
      `_PkValue=${placeId}`,
      `_usrToken=${localStorageusrToken}`,
    ].join("&");
    return axios.get(`${SQLREQUEST}/PlacesGetOne?${queryString}`);
  },
};

const Worker: WorkerType = {
  getList: (
    token,
    end = 21,
    order = "ASC",
    sort = "Number_On_Plase",
    start = 0
  ) => {
    const queryString = [
      `_Filter={}`,
      `_end=${end}`,
      `_order=${order}`,
      `_sort=${sort}`,
      `_start=${start}`,
      `_usrToken=${token}`,
    ].join("&");

    return axios.get(`${SQLREQUEST}/WorkerGetList?${queryString}`);
  },
  getLockWorker: (token, isForce, WorkerId) => {
    const queryString = [
      `isForce=${isForce}`,
      `Worker_Id=${WorkerId}`,
      `_usrToken=${token}`,
    ].join("&");

    return axios.get(`${HTTPREQUEST}/Worker_Place_Lock?${queryString}`);
  },
  getExecutorList: (
    token,
    end = 22,
    order = "ASC",
    sort = "Place_Id",
    start = 0
  ) => {
    const queryString = [
      `_Filter={}`,
      `_end=${end}`,
      `_order=${order}`,
      `_sort=${sort}`,
      `_start=${start}`,
      `_usrToken=${token}`,
    ].join("&");

    return axios.get(`${SQLREQUEST}/NextEXEcutorGetList?${queryString}`);
  },
};

const WorkerAll: WorkerAllType = {
  getList: (
    token,
    end = 21,
    order = "ASC",
    sort = "Number_On_Plase",
    start = 0
  ) => {
    const queryString = [
      `_Filter={}`,
      `_end=${end}`,
      `_order=${order}`,
      `_sort=${sort}`,
      `_start=${start}`,
      `_usrToken=${token}`,
    ].join("&");

    return axios.get(`${SQLREQUEST}/Worker_AllGetList?${queryString}`);
  },
  create: (params: any) => {
    const urlString = `${process.env.REACT_APP_HTTPREQUEST}/Create_Place`;
    const arr: string[] = [];
    const query = { ...params };

    for (const [key, value] of Object.entries(query)) {
      const str = `${key}=${value}`;
      arr.push(str);
    }
    const queryString = arr.join("&");

    return axios.get(`${urlString}?${queryString}`);
  },
  edit: (params: any) => {
    const urlString = `${process.env.REACT_APP_HTTPREQUEST}/Upd_Place`;
    const arr: string[] = [];
    const query = { ...params };

    for (const [key, value] of Object.entries(query)) {
      const str = `${key}=${value}`;
      arr.push(str);
    }
    const queryString = arr.join("&");

    return axios.get(`${urlString}?${queryString}`);
  },
  getOne: (placeId, localStorageusrToken) => {
    const queryString = [
      `_PkField=Place_Id`,
      `_PkValue=${placeId}`,
      `_usrToken=${localStorageusrToken}`,
    ].join("&");
    return axios.get(`${SQLREQUEST}/PlacesGetOne?${queryString}`);
  },
  makeWorkerAndHierarchy: (
    placeId,
    unitId,
    roleId,
    workerPlaceName,
    workerPlaceShort,
    localStorageusrToken
  ) => {
    const queryString = [
      `Place_Id=${placeId}`,
      `Unit_Id=${unitId}`,
      `RoleId=${roleId}`,
      `Worker_Place_Name=${workerPlaceName}`,
      `Worker_Place_Short=${workerPlaceShort}`,
      `_usrToken=${localStorageusrToken}`,
    ].join("&");
    return axios.get(`${HTTPREQUEST}/Make_Worker_And_Hierarchy?${queryString}`);
  },
  setWorkerOnOff: (
    workerId,
    roleId,
    isActive,
    workerPlaceName,
    workerPlaceShort,
    localStorageusrToken
  ) => {
    const queryString = [
      `Worker_Id=${workerId}`,
      `Is_Active=${isActive}`,
      `Role_Id=${roleId}`,
      `Worker_Place_Name=${workerPlaceName}`,
      `Worker_Place_Short=${workerPlaceShort}`,
      `_usrToken=${localStorageusrToken}`,
    ].join("&");
    return axios.get(`${HTTPREQUEST}/Set_Worker_On_Off?${queryString}`);
  },
};

const Arm: ArmType = {
  getEntryList: (
    token,
    filter,
    end = 18,
    order = "ASC",
    sort = "Queue_Date",
    start = 0
  ) => {
    const { qr, num, numTalon, name } = filter;

    const collect = [`"Queue_Direction":"ENTRY"`];

    if (num) {
      collect.push(`"Kis_Card_Id":${num}`);
    }
    if (numTalon) {
      collect.push(`"Emias_Pass_Num":${numTalon}`);
    }
    if (qr) {
      collect.push(`"Case_Id":${qr}`);
    }
    if (name) {
      collect.push(`"Patient_Surname":${name}`);
    }

    const filterString = encodeURIComponent(`{${collect.join(",")}}`);

    const queryString = [
      `_Filter=${filterString}`,
      `_end=${end}`,
      `_order=${order}`,
      `_sort=${sort}`,
      `_start=${start}`,
      `_usrToken=${token}`,
    ].join("&");

    return axios.get(`${SQLREQUEST}/OrderQueue4UnitGetList?${queryString}`);
  },
  getNextEntryList: (
    token,
    end = 22,
    order = "ASC",
    sort = "Order_Queue_Id",
    start = 0
  ) => {
    const queryString = [
      `_Filter={}`,
      `_end=${end}`,
      `_order=${order}`,
      `_sort=${sort}`,
      `_start=${start}`,
      `_usrToken=${token}`,
    ].join("&");

    return axios.get(`${SQLREQUEST}/NextEntryQueueGetList?${queryString}`);
  },
  restore2ENTRYOrderQueue: (token, OrderQueueId) => {
    const queryString = [
      `Order_Queue_Id=${OrderQueueId}`,
      `_usrToken=${token}`,
    ].join("&");

    return axios.get(
      `${HTTPREQUEST}/Restore_2_ENTRY_Order_Queue?${queryString}`
    );
  },
  getInwork: (
    token,
    end = 1,
    order = "ASC",
    sort = "Order_Queue_Id",
    start = 0
  ) => {
    const queryString = [
      `_Filter={"Queue_Direction":"INWORK"}`,
      `_end=${end}`,
      `_order=${order}`,
      `_sort=${sort}`,
      `_start=${start}`,
      `_usrToken=${token}`,
    ].join("&");

    return axios.get(`${SQLREQUEST}/OrderQueue4UnitGetList?${queryString}`);
  },
  takeInWork: ({
    token,
    OrderQueueId,
    vipValue,
    selectedCabinet,
    qrInWork,
  }) => {
    const vipValueV = vipValue ? 1 : 0;
    const selectedCabinetV = selectedCabinet === null ? 0 : selectedCabinet;
    const qrInWorkV = qrInWork || 0;

    const queryString = [
      `Order_Queue_Id=${OrderQueueId}`,
      `Priority=${vipValueV}`,
      `Worker_Id_4_Next=${selectedCabinetV}`,
      `Case_Id=${qrInWorkV}`,
      `_usrToken=${token}`,
    ].join("&");

    return axios.get(`${HTTPREQUEST}/get_inWork_Order_Queue?${queryString}`);
  },
  getNext: ({ token, vipValue, selectedCabinet, qrInWork }) => {
    const vipValueV = vipValue ? 1 : 0;
    const selectedCabinetV = selectedCabinet === null ? 0 : selectedCabinet;
    const qrInWorkV = qrInWork || 0;

    const queryString = [
      `Priority=${vipValueV}`,
      `Worker_Id_4_Next=${selectedCabinetV}`,
      `Case_Id=${qrInWorkV}`,
      `_usrToken=${token}`,
    ].join("&");

    return axios.get(`${HTTPREQUEST}/Call_NEXT_Order_Queue?${queryString}`);
  },
  getWorkerPlaceList: (
    token,
    end = 16,
    order = "ASC",
    sort = "Number_On_Plase",
    start = 0
  ) => {
    const queryString = [
      `_end=${end}`,
      `_order=${order}`,
      `_sort=${sort}`,
      `_start=${start}`,
      `_usrToken=${token}`,
    ].join("&");

    return axios.get(`${SQLREQUEST}/NextWorkerGetList?${queryString}`);
  },
  getOutputList: (
    token,
    end = 20,
    order = "DESC",
    sort = "Queue_Date",
    start = 0
  ) => {
    const queryString = [
      `_Filter={"Queue_Direction":"OUTPUT"}`,
      `_end=${end}`,
      `_order=${order}`,
      `_sort=${sort}`,
      `_start=${start}`,
      `_usrToken=${token}`,
    ].join("&");

    return axios.get(`${SQLREQUEST}/OrderQueue4UnitGetList?${queryString}`);
  },
  getPostpondList: (
    token,
    end = 14,
    order = "DESC",
    sort = "Queue_Date",
    start = 0
  ) => {
    const queryString = [
      `_Filter={"Queue_Direction":"POSTPOND"}`,
      `_end=${end}`,
      `_order=${order}`,
      `_sort=${sort}`,
      `_start=${start}`,
      `_usrToken=${token}`,
    ].join("&");

    return axios.get(`${SQLREQUEST}/OrderQueue4UnitGetList?${queryString}`);
  },
  putPostpondInfoAction: (token, OrderQueueId) => {
    const queryString = [
      OrderQueueId && `Order_Queue_Id=${OrderQueueId}`,
      `_usrToken=${token}`,
    ].join("&");

    return axios.get(`${HTTPREQUEST}/Put_POSTPOND_Order_Queue?${queryString}`);
  },
  putInWorkInfoBackToEntryAction: (token) =>
    axios.get(`${HTTPREQUEST}/Cancel_Current_Order_Queue?_usrToken=${token}`),
  putOutoutOrder2NextQueue: (token, OrderQueueId) =>
    axios.get(
      `${HTTPREQUEST}/Put_OUTPUT_Order_2_NEXT_Queue?Order_Queue_Id=${OrderQueueId}&_usrToken=${token}`
    ),
  putPostPoneBackToEntryAction: (token, OrderQueueId) =>
    axios.get(
      `${HTTPREQUEST}/Put_BACK_2_ENTRY_Order_Queue?Order_Queue_Id=${OrderQueueId}&_usrToken=${token}`
    ),
  sendScanWristBands: (token, nameInWork, kisNumInWork, qrInWork) => {
    const queryString = [
      `Case_Id=${qrInWork}`,
      `Hospital_Number=${kisNumInWork}`,
      `Patient_Surname=${nameInWork}`,
      `_usrToken=${token}`,
    ].join("&");

    return axios.get(`${HTTPREQUEST}/Send_Scan_WristBands?${queryString}`);
  },
  toAppointmentOrderQueue: (token, WorkerId4Next, Priority) => {
    const queryString = [
      `_usrToken=${token}`,
      `Worker_Id_4_Next=${WorkerId4Next}`,
      `Priority=${Priority}`,
    ].join("&");

    return axios.get(
      `${HTTPREQUEST}/To_Appointment_Order_Queue?${queryString}`
    );
  },
};

const ArmSuper: any = {
  getUnitGetList: (
    token: any,
    end = 22,
    order = "ASC",
    sort = "Unit_Id",
    start = 0
  ) => {
    const queryString = [
      `_Filter={}`,
      `_end=${end}`,
      `_order=${order}`,
      `_sort=${sort}`,
      `_start=${start}`,
      `_usrToken=${token}`,
    ].join("&");

    return axios.get(`${SQLREQUEST}/UnitGetList?${queryString}`);
  },
  getUnit4EntryGetList: (
    token: any,
    end = 22,
    order = "ASC",
    sort = "Unit_Id",
    start = 0
  ) => {
    const queryString = [
      `_Filter={}`,
      `_end=${end}`,
      `_order=${order}`,
      `_sort=${sort}`,
      `_start=${start}`,
      `_usrToken=${token}`,
    ].join("&");

    return axios.get(`${SQLREQUEST}/Unit4EntryGetList?${queryString}`);
  },
  getUnitEntryQueueGetList: (
    token: any,
    unitId: any,
    end = 22,
    order = "ASC",
    sort = "Unit_Id",
    start = 0
  ) => {
    // очередь в правый столбец
    const queryString = [
      `_Filter={"Unit_Id": ${unitId}}`,
      `_end=${end}`,
      `_order=${order}`,
      `_sort=${sort}`,
      `_start=${start}`,
      `_usrToken=${token}`,
    ].join("&");

    return axios.get(`${SQLREQUEST}/UnitEntryQueueGetList?${queryString}`);
  },
  getUnitExecutorGetList: (
    token: any,
    unitId: any,
    end = 22,
    order = "ASC",
    sort = "Unit_Id",
    start = 0
  ) => {
    // очередь в средний столбец
    const queryString = [
      `_Filter={"Unit_Id": ${unitId}}`,
      `_end=${end}`,
      `_order=${order}`,
      `_sort=${sort}`,
      `_start=${start}`,
      `_usrToken=${token}`,
    ].join("&");

    return axios.get(`${SQLREQUEST}/UnitExecutorGetList?${queryString}`);
  },
  getActiveSessionGetList: (
    token: any,
    end = 22,
    order = "ASC",
    sort = "Unit_Id",
    start = 0
  ) => {
    const queryString = [
      `_Filter={}`,
      `_end=${end}`,
      `_order=${order}`,
      `_sort=${sort}`,
      `_start=${start}`,
      `_usrToken=${token}`,
    ].join("&");

    return axios.get(`${SQLREQUEST}/ActiveSessionGetList?${queryString}`);
  },
  killActiveSession: (token: any, workerId: any) => {
    const queryString = [`_usrToken=${token}`, `Worker_Id=${workerId}`].join(
      "&"
    );

    return axios.get(`${HTTPREQUEST}/Kill_Session?${queryString}`);
  },
  createAppointmentOrder: (
    token: any,
    passNum: any,
    entryDate: any,
    unitId: any,
    WorkerId4Next = 0
  ) => {
    const queryString = [
      `_usrToken=${token}`,
      `Pass_Num_or_Number=${passNum}`,
      `Entry_Date_As_Planned=${entryDate}`,
      `Unit_Id_4_Next=${unitId}`,
      `Worker_Id_4_Next=${WorkerId4Next}`,
    ].join("&");

    return axios.get(`${HTTPREQUEST}/Create_Appointment_Order?${queryString}`);
  },
  orderQueueInWorkGetList: (
    token: any,
    unitId: any,
    patientNumber?: any,
    end = 22,
    order = "ASC",
    sort = "Unit_Id",
    start = 0
  ) => {
    let filterRes = "_Filter={}";

    if (!patientNumber && unitId && unitId !== -1) {
      filterRes = `_Filter={"Unit_Id": ${unitId}}`;
    } else if (patientNumber && (!unitId || unitId === -1)) {
      filterRes = `_Filter={"Patient_Number": ${patientNumber}}`;
    } else if (patientNumber && unitId && unitId !== -1) {
      filterRes = `_Filter={"Unit_Id": ${unitId}, "Patient_Number": ${patientNumber}}`;
    }

    const queryString = [
      filterRes,
      `_end=${end}`,
      `_order=${order}`,
      `_sort=${sort}`,
      `_start=${start}`,
      `_usrToken=${token}`,
    ].join("&");

    return axios.get(`${SQLREQUEST}/OrderQueueInWorkGetList?${queryString}`);
  },
  cancelCurrentOrderQueue: (token: any, orderQueueId: any) => {
    const queryString = [
      `Order_Queue_Id=${orderQueueId}`,
      `_usrToken=${token}`,
    ].join("&");

    return axios.get(
      `${HTTPREQUEST}/Cancel_Current_Order_Queue?${queryString}`
    );
  },
  finishAppointmentOrder: (token: any, orderQueueId: any) => {
    const queryString = [
      `Order_Queue_Id=${orderQueueId}`,
      `_usrToken=${token}`,
    ].join("&");

    return axios.get(`${HTTPREQUEST}/Finish_Appointment_Order?${queryString}`);
  },
  cancelAppointmentOrder: (token: any, orderQueueId: any) => {
    console.log("1");
    const queryString = [
      `Order_Queue_Id=${orderQueueId}`,
      `_usrToken=${token}`,
    ].join("&");

    return axios.get(`${HTTPREQUEST}/Cancel__Appointment_Order?${queryString}`);
  },
  adminPostPondQueueGetList: (
    token: any,
    unitId: any,
    patientNumber?: any,
    end = 22,
    order = "ASC",
    sort = "Unit_Id",
    start = 0
  ) => {
    let filterRes = "_Filter={}";

    if (!patientNumber && unitId && unitId !== -1) {
      filterRes = `_Filter={"Unit_Id": ${unitId}}`;
    } else if (patientNumber && (!unitId || unitId === -1)) {
      filterRes = `_Filter={"Patient_Number": ${patientNumber}}`;
    } else if (patientNumber && unitId && unitId !== -1) {
      filterRes = `_Filter={"Unit_Id": ${unitId}, "Patient_Number": ${patientNumber}}`;
    }

    const queryString = [
      filterRes,
      `_end=${end}`,
      `_order=${order}`,
      `_sort=${sort}`,
      `_start=${start}`,
      `_usrToken=${token}`,
    ].join("&");

    return axios.get(`${SQLREQUEST}/AdminPostPondQueueGetList?${queryString}`);
  },

  // /InternalRestApi/apiSQLRequest/AdminPostPondQueueGetList?_Filter={"Unit_Id": 3,}&_end=22&_order=ASC&_sort=Unit_Id&_start=0&_usrToken=210664A4FBBD2828A7A3440273B084EC
};

export {
  Auth,
  Arm,
  Worker,
  ArmSuper,
  User,
  Order4Q,
  Place,
  WorkerAll,
  MessageQueue4Link,
  LinkedUnitQueue,
  Unit_All,
  NamedListMember,
  TableauWorker
};
