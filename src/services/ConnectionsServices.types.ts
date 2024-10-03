type PureTokenType = string;

export type PureFilterType = {
  qr: string;
  num: string;
  numTalon: string;
  name: string;
};

export type DoCheckTokenRequestType = {
  token: string;
};

export type DoCheckTokenResponseType = {
  payLoad: {
    Role_Id: string | number;
    Role_Label: string;
    Role_Name: string;
    Usr_ID: string | number;
    Usr_Login: string;
    Usr_Name: string;
    token?: string;
    usrId: string | number;
    usrName?: string;
    _usrToken: string;
  };
  resultCode: number;
  resultMessage: string;
};

export type CheckWorkPlaceRequestType = {
  _usrToken: string;
};

export type CheckWorkPlaceResponseType = {
  payLoad: any;
  resultCode: number;
  resultMessage: string;
};

export type DoLogin4TokenRequestType = {
  login: string;
  password: string;
};

export type DoLogin4TokenResponseType = {
  payLoad: {
    Role_Id: string | number;
    Role_Label: string;
    Role_Name: string;
    Usr_ID: string | number;
    Usr_Login: string;
    Usr_Name: string;
    token: string;
    usrId: string | number;
    usrName?: string;
    _usrToken: string;
  };
  resultCode: number;
  resultMessage: string;
};

export type DoLogout4TokenRequestType = {
  _usrToken: string;
  usrId: string;
  token: string;
};

export type DoLogout4TokenResponseType = {
  payLoad: {
    token: string;
    usrId: number;
  };
  resultCode: number;
  resultMessage: string;
};

export type SetExecutor2PauseRequestType<T> = (
  token: PureTokenType,
  workerId4Next: string | number,
  vipValue: boolean
) => Promise<T>;

export type SetExecutor2PauseResponseType = {
  payLoad: {
    usrId: number | string;
    usrNameLock: string;
    workerId: number | string;
    workerPlaceName: string;
  };
  resultCode: number;
  resultMessage: string;
};

export type ResetPasswordType<T> = (
  login: string,
  password: string | undefined | null,
  token: PureTokenType
) => Promise<T>;

export type ResetPasswordResponsType = any;

export type WorkerGetListRequesrType = {
  _Filter: unknown;
  _end: number;
  _order: string;
  _sort: string;
  _start: number;
  _usrToken: string;
};

export type WorkerGetListResponseType = [
  {
    Activity_Date: string;
    Is_Auto: boolean;
    Is_Has_Workers: boolean;
    Is_Patient: boolean;
    Number_On_Plase: number;
    Number_On_Unit: number;
    Place_Id: number;
    Refresh_Interval: number;
    Role_Id: number;
    Unit_Id: number;
    Usr_Name: string;
    Worker_Id: number;
    Worker_Place_Name: string;
  }
];

export type WorkerPlaceLockRequestType = {
  isForce: "No" | "Yes";
  Worker_Id: number | string;
  _usrToken: string;
};

export type WorkerPlaceLockResponsePayLoadType = {
  Lock_Usr_Name: string;
  Usr_ID: number | string;
  Worker_Id: number | string;
  Worker_Place_Name: string;
};

export type WorkerPlaceLockResponseType = {
  payLoad: WorkerPlaceLockResponsePayLoadType;
  resultCode: number;
  resultMessage: string;
};

export type NextWorkerGetListRequestType = {
  _end: number;
  _order: string;
  _sort: string;
  _start: number;
  _usrToken: string;
};

export type NextWorkerGetListResponseType = [
  {
    Number_On_Plase: number | string;
    Place_Id: number | string;
    Worker_Id: number | string;
    Worker_Place_Name: string;
  }
];

export type Place2Woker4UsrIdGetListItemType = {
  Is_Used: 0 | 1;
  Login: string;
  Name: string;
  Place_Id: number;
  Qty_Work_Places: number;
  Target_Name: string;
  Usr_Id: number;
};

export type Place2Woker4UsrIdGetListResponseType =
  Place2Woker4UsrIdGetListItemType[];

export type NextEXEcutorGetListRequestType = {
  _Filter: unknown;
  _end: number;
  _order: string;
  _sort: string;
  _start: number;
  _usrToken: string;
};

export type NextEXEcutorGetListResponseType = [
  {
    Code_Header:
      | "inProgress"
      | "QisEmpty"
      | "nonWorking"
      | "isRecalled"
      | "isCalled";
    Date_Wristbands_Scan: string;
    Nn_4_Tableau: number | string;
    Order_Queue_Id: number | string;
    Patient_Header: string;
    Patient_Number: number | "-";
    Patient_Status: string;
    Retry_Count: number | null;
    Target_Header_Name: string;
    Target_Name: number | string;
  }
];

export type OrderQueue4UnitGetListRequestType = {
  _Filter: unknown;
  _end: number;
  _order: string;
  _sort: string;
  _start: number;
  _usrToken: string;
};

export type OrderQueue4UnitGetListResponseItemType = {
  Case_Id: string;
  Comments: string | null;
  Create_Record_Date: string;
  Date_Wristbands_Scan: null | string;
  Emias_Id: number | string;
  Emias_Pass_Num: number | string;
  Entry_Date_As_Planned: string;
  Kis_Card_Id: number | string;
  Kis_Service_Name: null | string;
  Next_Unit_Worker_Id: number | string;
  Order_Id: number | string;
  Order_Queue_Id: number | string;
  Patient_Name: string;
  Patient_Status: string;
  Patient_Surname: string;
  Priority: number | string;
  Queue_Date: string;
  Queue_Direction: string;
  Queue_Name: string;
  Retry_Count: null | number;
  Unit_Name: string;
  Unit_Queue_Id: number | string;
  Work_Begin_Date: string;
  Work_End_Date: null | string;
  Worker_Id: number | string;
  Worker_Place_Name: string;
};

export type OrderQueue4UnitGetListResponseType = [
  OrderQueue4UnitGetListResponseItemType
];

// export type OrderQueue4UnitGetListInWorkResponseType = {
//     Case_Id: string;
//     Comments: string | null;
//     Create_Record_Date: string;
//     Date_Wristbands_Scan: null | string;
//     Emias_Id: number | string;
//     Emias_Pass_Num: number | string;
//     Entry_Date_As_Planned: string;
//     Kis_Card_Id: number | string;
//     Kis_Service_Name: null | string;
//     Next_Unit_Worker_Id: number | string;
//     Order_Id: number | string;
//     Order_Queue_Id: number | string;
//     Patient_Name: string;
//     Patient_Surname: string;
//     Priority: number | string;
//     Queue_Date: string;
//     Queue_Direction: string;
//     Queue_Name: string;
//     Retry_Count: null | number;
//     Unit_Name: string;
//     Unit_Queue_Id: number | string;
//     Work_Begin_Date: string;
//     Work_End_Date: null | string;
//     Worker_Id: number | string;
//     Worker_Place_Name: string;
// }

export type SendScanWristBandsRequestType = {
  Case_Id: number;
  Hospital_Number: string;
  Patient_Surname: string;
  _usrToken: string;
};

export type SendScanWristBandsResponseType = [
  {
    payLoad: {
      Emias_Pass_Num: number | string;
      Kis_Card_Id: string;
      Name: string;
      Order_Queue_ID: number | string;
      Order_id: number | string;
      Patron: string;
      Surname: string;
    };
    resultCode: number;
    resultMessage: string;
  }
];

export type GetInWorkOrderQueueRequestType = {
  Order_Queue_Id: number;
  Priority: number;
  Worker_Id_4_Next: number;
  Case_Id: number;
  _usrToken: string;
};

export type GetInWorkOrderQueueResponseType = {
  payLoad: {
    Emias_Pass_Num: number | string;
    Kis_Card_Id: number | string;
    Order_Queue_Id: number | string;
    Worker_Place_Name: string;
  };
  resultCode: number;
  resultMessage: string;
};

export type CallNEXTOrderQueueRequestType = {
  Priority: number;
  Worker_Id_4_Next: number;
  Case_Id: number;
  _usrToken: string;
};

export type CallNEXTOrderQueueResponseType = {
  payLoad: {
    Emias_Pass_Num: number | string;
    Kis_Card_Id: number | string;
    Order_Queue_Id: number | string;
    Passed_InWork_2_OutPut_Order_Queue_Id: number | string;
    Unit_Queue_Id: number | string;
    Worker_Place_Name: string;
  };
  resultCode: number;
  resultMessage: string;
};

export type PutPOSTPONDOrderQueueRequestType = {
  _usrToken: string;
};

export type PutPOSTPONDOrderQueueResponseType = {
  payLoad: {
    Emias_Pass_Num: number | string;
    Kis_Card_Id: number | string;
    Order_Queue_Id: number | string;
    Unit_Queue_ID: number | string;
    Worker_Place_Name: string;
  };
  resultCode: number;
  resultMessage: string;
};

export type CancelCurrentOrderQueueRequestType = {
  _usrToken: string;
};

export type CancelCurrentOrderQueueResponseType = {
  payLoad: {
    usrId: number | string;
    usrNameLock: string;
    workerId: number | string;
    workerPlaceName: string;
  };
  resultCode: number;
  resultMessage: string;
};

export type PutOUTPUTOrder2NEXTQueueRequestType = {
  Order_Queue_Id: number;
  _usrToken: string;
};

export type PutOUTPUTOrder2NEXTQueueResponseType = {
  payLoad: {
    ENTRY_Order_Queue_Id: number | string;
    Emias_Pass_Num: number | string;
    Kis_Card_Id: number | string;
    Order_Queue_Id: number | string;
    Unit_Queue_Id: number | string;
    Worker_Place_Name: string;
  };
  resultCode: number;
  resultMessage: string;
};

export type PutBACK2ENTRYOrderQueueRequestType = {
  Order_Queue_Id: number;
  _usrToken: string;
};

export type PutBACK2ENTRYOrderQueueResponseType = {
  payLoad: {
    Emias_Pass_Num: number | string;
    Kis_Card_Id: number | string;
    Order_Queue_Id: number | string;
    Unit_Queue_Id: number | string;
    Worker_Place_Name: string;
  };
  resultCode: number;
  resultMessage: string;
};

export type ToAppointmentOrderQueueResponseType = {
  payLoad: {
    Order_id: number | string;
    Emias_Pass_Num: number | string;
    Kis_Card_Id: number | string;
    Surname: string;
    Order_Queue_ID: number | string;
    Name: string;
    Patron: string;
  };
  resultCode: number;
  resultMessage: string;
};

type TokenType<T> = (token: PureTokenType) => Promise<T>;

type LoginType = (
  username: string,
  password: string
) => Promise<DoLogin4TokenResponseType>;

type LogoutType = (
  token: string,
  usrId: string
) => Promise<DoLogout4TokenResponseType>;

type GetSortedType<T> = (
  token: PureTokenType,
  end?: number,
  order?: string,
  sort?: string,
  start?: number
) => Promise<T>;

type MessageQueue4LinkGetSortedType<T> = (
  linkUnitQueueId: number,
  token: PureTokenType,
  end?: number,
  order?: string,
  sort?: string,
  start?: number
) => Promise<T>

type TableauWorkerGetSortedType<T> = (
    TableauWorkerId: number,
    token: PureTokenType,
    end?: number,
    order?: string,
    sort?: string,
    start?: number
) => Promise<T>;

type LinkedUnitQueueAddType<T> = (
  queue_id: number,
  id: number,
  isAlternative: boolean,
  token: PureTokenType,
) => Promise<T>;

type NamedListMemberAddType<T> = (
  unitId: number,
  listId: number,
  token: PureTokenType,
) => Promise<T>;

type GetSortedExtendedType<T> = (
  userId: number | string,
  token: PureTokenType,
  end?: number,
  order?: string,
  sort?: string,
  start?: number
) => Promise<T>;

type Unit_AllGetListType<T> = (
  token: PureTokenType,
  end?: number,
  order?: string,
  sort?: string,
  start?: number
) => Promise<T>;

type GetLockWorkerType = (
  token: PureTokenType,
  isForce: "Yes" | "No",
  WorkerId?: number | string
) => Promise<WorkerPlaceLockResponseType>;

type getEntryListType = (
  token: PureTokenType,
  filter: PureFilterType,
  end?: number,
  order?: string,
  sort?: string,
  start?: number
) => Promise<OrderQueue4UnitGetListResponseType>;

type CreateUserType = (params: any) => Promise<any>;

type GetOneUserType = (
  UserId: number | string,
  localStorageusrToken: PureTokenType
) => Promise<any>;

type EditUserType = (params: any) => Promise<EditUserResponseType>;

export type EditUserResponseType = {
  payLoad: {
    State: "ON" | "OFF" | string;
    Role_ID: number;
    Usr_Name: string;
  };
  ResultCode: number;
  ResultMessage: string;
};

type getNextEntryListType = (
  token: PureTokenType,
  end?: number,
  order?: string,
  sort?: string,
  start?: number
) => Promise<OrderQueue4UnitGetListResponseType>;

type restore2ENTRYOrderQueueType = (
  token: PureTokenType,
  OrderQueueId: string
) => Promise<GetInWorkOrderQueueResponseType>;

type TakeInworkType = (T: {
  token: PureTokenType;
  OrderQueueId?: string;
  vipValue: boolean;
  selectedCabinet: number;
  qrInWork?: string | number;
}) => Promise<GetInWorkOrderQueueResponseType>;

type GetNextType = (T: {
  token: PureTokenType;
  vipValue: boolean;
  selectedCabinet: number;
  qrInWork?: string | number;
}) => Promise<CallNEXTOrderQueueResponseType>;

type QueueTokenType<T> = (
  token: PureTokenType,
  OrderQueueId: string
) => Promise<T>;

type SendScanWristBandsType = (
  token: PureTokenType,
  nameInWork: string,
  kisNumInWork: number | string,
  qrInWork: number | string
) => Promise<any>;

type ToAppointmentOrderQueueType<T> = (
  token: PureTokenType,
  WorkerId4Next: string | number,
  Priority: string | number
) => Promise<T>;

type PutPostpondInfoActionType<T> = (
  token: PureTokenType,
  OrderQueueId?: string
) => Promise<T>;

export type SetWorkPlaceslistRequestType<T> = (
  placeId: number | string,
  userId: number | string,
  isUsed: 0 | 1,
  token: PureTokenType
) => Promise<T>;

export type SetWorkPlaceslistResponseType = {
  payLoad: {
    Usr_ID: number | string;
    Place_Id: number | string;
    Places_Name: string;
    Usr_Name: string;
  };
  resultCode: number;
  resultMessage: string;
};

type Order4QSortedExtendedType<T> = (
  queueDirection: string,
  token: PureTokenType,
  end?: number,
  order?: string,
  sort?: string,
  start?: number
) => Promise<T>;

export type Order4QGetListResponseType = [
  {
    Order_Id: number | string;
    Entry_Date_As_Planned: string;
    Worker_Set_Date: string;
    Case_Id: number | string;
    Patient_Status: string;
    Unit_Queue_Id: number | string;
    Priority: number | string;
    Queue_Direction: string;
    Kis_Card_Id: number | string;
    Work_Begin_Date: string;
    Order_Queue_Id: number | string;
    Unit_Id: number | string;
    Kis_Service_Name: string;
    Emias_Pass_Num: number | string;
    Emias_Id: number | string;
    Worker_Id: number | string;
    Kis_Service_Description: string;
    Work_End_Date: string;
    Unit_Name: string;
    Next_Unit_Worker_Id: number | string;
  }
];

/**
 * Place
 */

type CreatePlaceType = (params: any) => Promise<any>;

type EditPlaceType = (params: any) => Promise<EditPlaceResponseType>;

export type EditPlaceResponseType = {
  payLoad: {
    Place_Id: number;
  };
  ResultCode: number;
  ResultMessage: string;
};

type GetOnePlaceType = (
  PlaceId: number | string,
  localStorageusrToken: PureTokenType
) => Promise<any>;

/**
 * WorkerAll
 */

export type WorkerAllGetListResponseType = [
  {
    Number_On_Unit: number;
    Unit_Id: number;
    Place_Id: number;
    Place_Name: string;
    Worker_Place_Short: string;
    Worker_Place_Name: string;
    Worker_Id: number | string;
    Number_On_Plase: number;
    Unit_Name: string;
    Role_Name: string;
    Role_Id: number;
  }
];

export type MessageQueue4LinkResponseType = [
  {
    Link_Unit_Queue_Id: number,
    Queue_Name: string,
    Unit_Queue_Id: number,
  }
];

export type TableauWorkerResponseType = [
  {
    Tableau_Worker_Id: number,
    Controlled_Worker_Id: number,
    Rowid: string,
  }
];

export type LinkedUnitQueueAddResponseType = any;

export type Unit_AllGetListResponseType = any;

export type NamedListMemberAddResponseType = any;

type CreateWorkerAllType = (params: any) => Promise<any>;

type EditWorkerAllType = (params: any) => Promise<EditWorkerAllResponseType>;

export type EditWorkerAllResponseType = {
  payLoad: {
    Worker_Id: number;
  };
  ResultCode: number;
  ResultMessage: string;
};

type GetOneWorkerAllType = (
  WorkerId: number | string,
  localStorageusrToken: PureTokenType
) => Promise<any>;

type makeWorkerAndHierarchyType = (
  Place_Id: number,
  Role_Id: number,
  Unit_Id: number,
  Worker_Place_Name: string,
  Worker_Place_Short: string,
  localStorageusrToken: PureTokenType
) => Promise<any>;

type setWorkerOnOffType = (
  Worker_Id: number,
  Role_Id: number,
  Is_Active: boolean,
  Worker_Place_Name: string,
  Worker_Place_Short: string,
  localStorageusrToken: PureTokenType
) => Promise<any>;

/**
 *
 */

export type AuthType = {
  login: LoginType; // + DoLogin4TokenRequestType / DoLogin4TokenResponseType
  // logout: TokenType<DoLogout4TokenResponseType>; // + DoLogout4TokenRequestType / DoLogout4TokenResponseType
  logout: LogoutType; // + DoLogout4TokenRequestType / DoLogout4TokenResponseType
  pause: SetExecutor2PauseRequestType<SetExecutor2PauseResponseType>; // + SetExecutor2PauseRequestType / SetExecutor2PauseResponseType
  checkToken: TokenType<DoCheckTokenResponseType>; // + DoCheckTokenRequestType / DoCheckTokenResponseType
  checkUserRoleStatus: TokenType<CheckWorkPlaceResponseType>; // + CheckWorkPlaceRequestType / CheckWorkPlaceResponseType
  resetPassword: ResetPasswordType<ResetPasswordResponsType>;
};

export type WorkerType = {
  getList: GetSortedType<WorkerGetListResponseType>; // + WorkerGetListRequesrType / WorkerGetListResponseType
  getLockWorker: GetLockWorkerType; // + WorkerPlaceLockRequestType / WorkerPlaceLockResponseType
  getExecutorList: GetSortedType<NextEXEcutorGetListResponseType>; // + NextEXEcutorGetListRequestType / NextEXEcutorGetListResponseType
};

export type ArmType = {
  getEntryList: getEntryListType; // + OrderQueue4UnitGetListRequestType / OrderQueue4UnitGetListResponseType
  getNextEntryList: getNextEntryListType; // + OrderQueue4UnitGetListRequestType / OrderQueue4UnitGetListResponseType
  restore2ENTRYOrderQueue: restore2ENTRYOrderQueueType;
  getInwork: GetSortedType<OrderQueue4UnitGetListResponseType>; // + OrderQueue4UnitGetListRequestType / OrderQueue4UnitGetListResponseType
  takeInWork: TakeInworkType; // + GetInWorkOrderQueueRequestType / GetInWorkOrderQueueResponseType
  getNext: GetNextType; // + CallNEXTOrderQueueRequestType / CallNEXTOrderQueueResponseType
  getWorkerPlaceList: GetSortedType<NextWorkerGetListResponseType>; // + OrderQueue4UnitGetListRequestType / OrderQueue4UnitGetListResponseType
  getOutputList: GetSortedType<OrderQueue4UnitGetListResponseType>; // + OrderQueue4UnitGetListRequestType / OrderQueue4UnitGetListResponseType
  getPostpondList: GetSortedType<OrderQueue4UnitGetListResponseType>; // + OrderQueue4UnitGetListRequestType / OrderQueue4UnitGetListResponseType
  putPostpondInfoAction: PutPostpondInfoActionType<PutPOSTPONDOrderQueueResponseType>; // + PutPOSTPONDOrderQueueRequestType / PutPOSTPONDOrderQueueResponseType
  putInWorkInfoBackToEntryAction: TokenType<CancelCurrentOrderQueueResponseType>; // + CancelCurrentOrderQueueRequestType / CancelCurrentOrderQueueResponseType
  putOutoutOrder2NextQueue: QueueTokenType<PutOUTPUTOrder2NEXTQueueResponseType>; // + PutOUTPUTOrder2NEXTQueueRequestType / PutOUTPUTOrder2NEXTQueueResponseType
  putPostPoneBackToEntryAction: QueueTokenType<PutBACK2ENTRYOrderQueueResponseType>; // + PutBACK2ENTRYOrderQueueRequestType / PutBACK2ENTRYOrderQueueResponseType
  sendScanWristBands: SendScanWristBandsType; // + SendScanWristBandsRequestType / SendScanWristBandsResponseType
  toAppointmentOrderQueue: ToAppointmentOrderQueueType<ToAppointmentOrderQueueResponseType>; // + ToAppointmentOrderQueueResponseType
};

export type UserType = {
  create: CreateUserType; // + OrderQueue4UnitGetListRequestType / OrderQueue4UnitGetListResponseType
  edit: EditUserType; // + OrderQueue4UnitGetListRequestType / OrderQueue4UnitGetListResponseType
  getOne: GetOneUserType; // + OrderQueue4UnitGetListRequestType / OrderQueue4UnitGetListResponseType
  getWorkerPlaceList: GetSortedExtendedType<Place2Woker4UsrIdGetListResponseType>; // + OrderQueue4UnitGetListRequestType / OrderQueue4UnitGetListResponseType
  setWorkPlaceslist: SetWorkPlaceslistRequestType<SetWorkPlaceslistResponseType>;
};

export type Order4QType = {
  getList: Order4QSortedExtendedType<Order4QGetListResponseType>; // + OrderQueue4UnitGetListRequestType / OrderQueue4UnitGetListResponseType
};

export type PlaceType = {
  create: CreatePlaceType; // + OrderQueue4UnitGetListRequestType / OrderQueue4UnitGetListResponseType
  edit: EditPlaceType; // + OrderQueue4UnitGetListRequestType / OrderQueue4UnitGetListResponseType
  getOne: GetOnePlaceType; // + OrderQueue4UnitGetListRequestType / OrderQueue4UnitGetListResponseType
};

export type WorkerAllType = {
  getList: GetSortedType<WorkerAllGetListResponseType>; // + WorkerGetListRequesrType / WorkerGetListResponseType
  create: CreateWorkerAllType; // + OrderQueue4UnitGetListRequestType / OrderQueue4UnitGetListResponseType
  edit: EditWorkerAllType; // + OrderQueue4UnitGetListRequestType / OrderQueue4UnitGetListResponseType
  getOne: GetOneWorkerAllType; // + OrderQueue4UnitGetListRequestType / OrderQueue4UnitGetListResponseType
  makeWorkerAndHierarchy: makeWorkerAndHierarchyType;
  setWorkerOnOff: setWorkerOnOffType;
};

export type MessageQueue4LinkType = {
  getList: MessageQueue4LinkGetSortedType<MessageQueue4LinkResponseType>; // + WorkerGetListRequesrType / WorkerGetListResponseType
}
export type TableauWorkerType = {
  getList: TableauWorkerGetSortedType<TableauWorkerResponseType>; // + WorkerGetListRequesrType / WorkerGetListResponseType
}

export type LinkedUnitQueueType = {
  add: LinkedUnitQueueAddType<LinkedUnitQueueAddResponseType>; 
}

export type NamedListMemberType = {
  add: NamedListMemberAddType<NamedListMemberAddResponseType>; 
}

export type Unit_AllType = {
  getList: Unit_AllGetListType<Unit_AllGetListResponseType>; 
}