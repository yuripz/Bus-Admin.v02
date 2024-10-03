/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import { AuthProvider } from "react-admin";
import { stringify } from "query-string";

let EnvAuthProviderURL: string | undefined = process.env.REACT_APP_REST_API_URL;
// let AuthProviderURL: string = "http://que01.paradit.ru:80/HermesService/GetHttpRequest"; // "http://127.0.0.1:8008/HermesService/GetHttpRequest"; //http://receiver.bus:80/HermesService/GetHttpRequest";
// let AuthProviderURL: string =  process.env.REACT_APP_HTTPREQUEST || "http://que01s.paradit.ru:80/HermesService/GetHttpRequest";
let AuthProviderURL: string | undefined = process.env.REACT_APP_HTTPREQUEST;
if (EnvAuthProviderURL !== undefined) AuthProviderURL = EnvAuthProviderURL;

const authProvider: AuthProvider = {
  login: ({ username, password }) => {
    const apiUrl: string = `${AuthProviderURL}/do_Login_4_Token?`; //'http://vmbus:8008/HermesService/GetHttpRequest/do_Login_4_Token?';
    const query = { login: username, password: password };
    const url = `${apiUrl}${stringify(query)}`;

    const request = new Request(url, {
      method: "GET",
      // body: JSON.stringify({ username, password }),
      headers: new Headers({ "Content-Type": "application/json" }),
    });
    // console.log("login: url=", url);
    return fetch(request)
      .then((response) => {
        // console.log("login: response=", response);
        if (response.status < 200 || response.status >= 300) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((auth) => {
        // console.log("login: setItem(auth)=", JSON.stringify(auth));
        sessionStorage.setItem("auth", JSON.stringify(auth));
        sessionStorage.setItem("Usr_Login", username);
        sessionStorage.setItem("Role_Label", auth.Response.payLoad.Role_Label);
      })
      .catch(() => {
        throw new Error("Network error");
      });
    /*
        sessionStorage.setItem('username', username);
        // accept all username/password combinations
        return Promise.resolve();
        */
  },
  logout: () => {
    sessionStorage.removeItem("Usr_Name");
    sessionStorage.removeItem("auth");
    sessionStorage.removeItem("Usr_ID");
    sessionStorage.removeItem("_usrToken");
    sessionStorage.removeItem("usr_Role");

    return Promise.resolve();
  },
  checkError: () => {
    const auth = sessionStorage.getItem("auth");
    let authString: string =
      ' {"Response": {' +
      '"payLoad": {' +
      '"Usr_ID": 0,' +
      '"Role_Label": "nnnn",' +
      '"_usrToken": "xxxxxxxxxxxx"' +
      "    }," +
      '"resultMessage": "sessionStorage.getItem( auth ) return null" ,' +
      '"resultCode": -112' +
      "}}";
    if (auth !== null) authString = auth;

    const authObj = JSON.parse(authString);

    // console.log(authObj.Response.payLoad._usrToken);
    // console.log(authObj.Response.payLoad.Usr_ID);

    return Promise.resolve(authObj.Response.resultMessage);
  },
  checkAuth: () => {
    const auth = sessionStorage.getItem("auth");
    let authString: string =
      '{"Response": {' +
      '    "payLoad": {' +
      '        "Usr_ID": 0,' +
      '        "_usrToken": "xxxxxxxxxxxx",' +
      '"Role_Label": "nnnn",' +
      '        "Role_Id": 0,' +
      '        "Usr_Login": "yyyyy",' +
      '        "Usr_Name": "zzzzzz"' +
      "    }," +
      '    "resultMessage": "sessionStorage.getItem( auth ) return null" ,' +
      '    "resultCode": -111' +
      "}}";

    if (auth !== null) authString = auth;

    const authObj = JSON.parse(authString);
    // console.log("checkAuth =", authObj);

    if (authObj.Response === undefined) {
      if (authObj.Fault !== undefined)
        return Promise.reject(authObj.Fault.faultstring);
    }
    // console.log("checkAuth: PayLoad=", authObj.Response.payLoad);
    // console.log("checkAuth: ResultCode=", authObj.Response.resultCode);
    let ResultCode: number | undefined = authObj.Response.resultCode;
    let RoleLabel: string | undefined = authObj.Response.payLoad.Role_Label;
    if (ResultCode !== undefined && ResultCode === 0) {
      if (RoleLabel !== undefined) {
        // console.log("RoleLabel === ", RoleLabel, " Json[", authString, "]");
        if (RoleLabel !== "SysAdmin" && RoleLabel !== "BusinessAdmin")
          return Promise.reject(
            new Error("User should have Role SysAdmin or BusinessAdmin")
          );
        // return Promise.reject( 'User should have Role SysAdmin or BusinessAdmin');
      } else {
        // console.log("RoleLabel === undefined! ", authString);
        return Promise.reject(
          new Error("User should have Role SysAdmin or BusinessAdmin")
        );
      }

      sessionStorage.setItem("Usr_ID", authObj.Response.payLoad.Usr_ID);
      sessionStorage.setItem("_usrToken", authObj.Response.payLoad._usrToken);
      sessionStorage.setItem("Usr_Name", authObj.Response.payLoad.Usr_Name);
      sessionStorage.setItem("Role_Id", authObj.Response.payLoad.Role_Id);
      sessionStorage.setItem(
        "Role_Label",
        authObj.Response.payLoad.Role_Label
      );
      return Promise.resolve(authObj.Response.resultMessage);
    }
    return Promise.reject(authObj.Response.resultMessage);
    // return sessionStorage.getItem('username') ? Promise.resolve() : Promise.reject()
  },

  getPermissions: () => {
    const RoleLabel = localStorage.getItem("Role_Label");
    if (RoleLabel !== undefined) {
      if (RoleLabel !== null) {
        console.warn("call getPermissions : ", RoleLabel);
        return Promise.resolve(RoleLabel);
      }
    }
    console.warn("call getPermissions -reject  ", RoleLabel);
    return Promise.resolve("undefined");
    //return Promise.reject(new Error('getPermissions fault'))
  },
  getIdentity: () => {
    const auth = sessionStorage.getItem("auth");
    let authString: string = '{ "ResultCode": -111 }';
    if (auth !== null) authString = auth;

    const authObj = JSON.parse(authString);
    // if (auth !== null)

    // const Usr_ID = sessionStorage.getItem('Usr_ID');
    const usrName = sessionStorage.getItem("Usr_Name");
    const usrID = sessionStorage.getItem("Usr_ID");
    const usrLogin = sessionStorage.getItem("Usr_Login");
    let usrIDSring: string = "0";
    if (auth !== null)
      usrIDSring = `Login ${usrLogin} ( Id=${usrID} ) ${usrName}`;
    console.log("getIdentity: UserName=", usrName);
    console.log("getIdentity: Usr_ID=", authObj.Response.payLoad.Usr_ID);
    return Promise.resolve({
      id: "user",
      fullName: usrIDSring,
      avatar:
        "data:image/png;base64,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",
    });
  },
};

export default authProvider;
