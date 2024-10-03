/* eslint-disable import/no-extraneous-dependencies */
// @ts-ignore
import { stringify } from "query-string";
import { fetchUtils } from "ra-core";
import type { DataProvider, RaRecord, CreateParams, CreateResult } from "ra-core";

// import type { DataProvider } from "./dataTypes";
//import {forEach} from "lodash";
//import {forEach} from "lodash";
// import {Console} from "inspector";

/**
 * Maps react-admin queries to a json-server powered REST API
 *
 * @see https://github.com/typicode/json-server
 *
 * @example
 *
 * getList          => GET http://my.api.url/posts?_sort=title&_order=ASC&_start=0&_end=24
 * getOne           => GET http://my.api.url/posts/123
 * getManyReference => GET http://my.api.url/posts?author_id=345
 * getMany          => GET http://my.api.url/posts/123, GET http://my.api.url/posts/456, GET http://my.api.url/posts/789
 * create           => POST http://my.api.url/posts/123
 * update           => PUT http://my.api.url/posts/123
 * updateMany       => PUT http://my.api.url/posts/123, PUT http://my.api.url/posts/456, PUT http://my.api.url/posts/789
 * delete           => DELETE http://my.api.url/posts/123
 *
 * @example
 *
 * import * as React from "react";
 * import { Admin, Resource } from 'react-admin';
 * import jsonServerProvider from 'ra-data-json-server';
 *
 * import { PostList } from './posts';
 *
 * const App = () => (
 *     <Admin dataProvider={jsonServerProvider('http://jsonplaceholder.typicode.com')}>
 *         <Resource name="posts" list={PostList} />
 *     </Admin>
 * );
 *
 * export default App;
 */
const _reKeyResponse = (json: any, key: string) => {
  // console.log("_reKeyResponse key: ", key, " json " , json);
  if (key === null) {
    return json;
  } else if (Array.isArray(json)) {
    // console.log("isArray");
    return json.map((x) => {
      // console.log("map ", key, x[key]);
      x.id = x[key];
      x[key] = undefined;
      console.log("map x.id ", x.id);
      return x;
    });
  } else if (json[key] !== null) {
    // console.warn( 'before _reKeyResponse: ', json);
    json.id = json[key];
    json[key] = undefined;
    return json;
  } else {
    console.error("undhandled scenario of _reKeyResponse", key, json);
  }
};
const _reKeyPayload = (data: any, reParam: string) => {
  if (reParam === null) {
    return data;
  }
  var { id, ...others } = data;
  others[reParam] = id;
  return others;
};
const _reKeyFilter = (filter: any, reParam: string) => {
  if (filter === null) {
    return null;
  }
  var { id, ...reFilter } = filter;

  if (reParam !== null && id) {
    reFilter[reParam] = id;
  }
  return reFilter;
};
//{key:String, values :String }
type mapKeysByResourceType = {
  resourceName: string;
  resourcePkfield: string;
};
//const
/*var arr mapKeysByResourceType
const mapKeysByResource: Array<{ resourceName: string, resourcePkfield: string }> = Array(
    {
{resourceName:"StatReport_N","Check_Order_Id" },
{"MessageDirections": 'Id'}, //'Msgdirection_Cod' ,

);
*/
const mapKeysByResource: any = {
  MessageDirections: "Msgdirection_Cod",
  MessageTypes: "Rowid",
  MessageTemplates: "Template_Id",
  MessageQueue: "Queue_Id",
  MessageIntefaces: "Interface_Id", //"Rowid",
  AU_Users: "Usr_Id",
  MessageQueueLog: "Rowid",
  MessageQueueDet: "Rowid",
  MessageTemplatesEntry: "Config_Id",


};
//https://e-admins.paradit.ru/HermesService/InternalRestApi/apiSQLRequest/Message_Queue_4_LinkGetList?_usrToken=5D158487DDD2D9D3574B4E86F7C7C0E1&Unit_Queue_Id=12346
const doMapKeysByResource = (resourceName: string) => {
  let i: number = 0;
  //console.log(`domapKeysByResource (${resourceName} ): mapKeysByResource.Object.keys=  ${Object.keys(mapKeysByResource)}`);
  //console.log(`domapKeysByResource (${resourceName} ): mapKeysByResource.Object.values=  ${Object.values(mapKeysByResource)}`);
  const iKeysByResource: string[] = Object.keys(mapKeysByResource);
  const valKeysByResource: string[] = Object.values(mapKeysByResource);
  //console.log( `domapKeysByResource (${resourceName} ): mapKeysByResource.length=  ${iKeysByResource.length }`);
  for (i = 0; i < iKeysByResource.length; i++) {
    //console.log( `${i} :  ${iKeysByResource[i]}`);
    if (iKeysByResource[i] === resourceName) {
      // console.log( `domapKeysByResource found ${i} :  ${iKeysByResource[i]} : ${valKeysByResource[i]}`);
      return valKeysByResource[i];
    }
  }
  return "";
};

// type ODataProvider = Omit<DataProvider, 'create'>;

// export interface ResouceProvider extends ODataProvider {
//   create: (resource: any, params: CreateParams) => Promise<CreateResult<any>>;
// };

// type ResouceProvider = Omit<DataProvider, 'create'>;



export default (
  apiUrl: string,
  keysByResource: any = {
    MessageDirections: "Msgdirection_Cod",
    MessageTypes: "Rowid",
    MessageTemplates: "Template_Id",
    MessageQueue: "Queue_Id",
    MessageIntefaces: "Interface_Id", //"Rowid",
    AU_Users: "Usr_Id",
    MessageQueueLog: "Rowid",
    MessageQueueDet: "Rowid",
    MessageTemplatesEntry: "Config_Id",


  },
  httpClient = fetchUtils.fetchJson
): DataProvider => ({
  //keysByResource: keysByResource,

  getList: (resource, params) => {
    //console.info("getList", resource, params);

    // const reParam: string = resource in mapKeysByResource ? mapKeysByResource[resource] : null;
    //console.warn("reParam",  reParam);
    // const reParam: string = null; //doMapKeysByResource( resource );

    const { page, perPage } = params.pagination;
    let { field, order } = params.sort;

    const reFilter = _reKeyFilter(params.filter, doMapKeysByResource(resource));

    //if (reParam != null && field === "id") {
    if (field === "id") {
      field = doMapKeysByResource(resource);
      //field = reParam;
    }
    console.log( "getList: field =", field);
    //console.log( "getList: reFilter=", reFilter);

    let localStorageusrToken: string | undefined | null =
      sessionStorage.getItem("_usrToken");
    let usrToken: string;
    if (localStorageusrToken === null || localStorageusrToken === undefined)
      usrToken = "xxxxxxxxxxx";
    else usrToken = localStorageusrToken;

    const query = {
      _Filter: JSON.stringify(reFilter), //JSON.stringify([field, order]), // JSON.stringify(params.filter), //
      _sort: field,
      _order: order,
      _start: (page - 1) * perPage,
      _end: page * perPage,
      _usrToken: usrToken,
    };
    //const url = `${apiUrl}/${resource}?${stringify(query)}`;
    const url = `${apiUrl}/${resource}GetList?${stringify(query)}`;

    return httpClient(url).then(({ headers, json }) => {
      console.info( "getList: json =", json);
      if (!headers.has("x-total-count")) {
        throw new Error(
          "The X-Total-Count header is missing in the HTTP Response. The jsonServer Data Provider expects responses for lists of resources to contain this header with the total number of results to build the pagination. If you are using CORS, did you declare X-Total-Count in the Access-Control-Expose-Headers header?"
        );
      }
      let totalCount: string | null | undefined = "10";
      let totalRecord: number = 10;

      // console.warn('x-total-count=', headers.get('x-total-count'));
      if (headers.get("x-total-count") !== undefined) {
        let contentRangeReader: string | undefined = (
          headers.get("x-total-count") as string
        )
          .split("/")
          .pop();
        if (contentRangeReader !== undefined) {
          //console.warn('1');
          totalCount = contentRangeReader.split("/").pop();
        }
        // console.warn('getList totalCount=', totalCount);
        if (totalCount !== undefined && totalCount !== null)
          totalRecord = parseInt(totalCount, 10);
        else {
          //console.warn('3');
          totalCount = "10";
          totalRecord = 10;
        }
      }
      //totalRecord++; console.warn('totalRecord===', totalRecord);

      //console.warn('totalRecord =', totalRecord);
      if (totalRecord === 0) {
        //console.warn('getList json =', json);
        return {
          data: json,
          total: totalRecord,
        };
      } else {        
        const field: string = doMapKeysByResource(resource);
        //console.info( "getList: _reKeyResponse=", _reKeyResponse(json, field)); !!! _reKeyResponse не ПОВТОРЯЕМА!
        return {
          data: _reKeyResponse(json, field), //null), // json,
          total: totalRecord,
        };
      }
    });
  },

  getOne: (resource, params) => {
    // const reParam = resource in keysByResource ? keysByResource[resource] : null;

    let localStorageusrToken: string | undefined | null =
      sessionStorage.getItem("_usrToken");
    let usrToken: string;
    if (localStorageusrToken === null || localStorageusrToken === undefined)
      usrToken = "xxxxxxxxxxx";
    else usrToken = localStorageusrToken;

    let field: string = doMapKeysByResource(resource); //reParam;
    if (field === null) {
      field = "Id";
    }
    /*
        if ( field === "id") {
            field = doMapKeysByResource( resource );
            //field = reParam;
        }*/
    const query = { _PkField: field, _PkValue: params.id, _usrToken: usrToken };
    const url = `${apiUrl}/${resource}GetOne?${stringify(query)}`;
    // console.log( "getOne: url=", url);
    // return httpClient(`${apiUrl}/${resource}/${params.id}`)
    return httpClient(url).then(({ json }) => {
      const reParam = doMapKeysByResource(resource);
      //console.warn( "getOne: try ", reParam , " => id=", json);
      //const jsonreKeyResponse = _reKeyResponse(json, reParam);
      //console.warn( "getOne: _reKeyResponse_jsonreKeyResponse.id =", jsonreKeyResponse );
      //console.warn( "getOne: _reKeyResponse=", jsonreKeyResponse );
      return {
        data: _reKeyResponse(json, reParam), // json,
      };
    });
  },

  getMany: (resource, params) => {
    //console.warn("getmany for ", resource );
    //const reParam = resource in keysByResource ? keysByResource[resource] : null;
    let localStorageusrToken: string | undefined | null =
      sessionStorage.getItem("_usrToken");
    let usrToken: string;
    if (localStorageusrToken === null || localStorageusrToken === undefined)
      usrToken = "xxxxxxxxxxx";
    else usrToken = localStorageusrToken;

    let field: string = doMapKeysByResource(resource); //reParam;
    if (field === null) {
      field = "Id";
    }
    console.warn("getmany for `", resource, "` , field =`", field, "`");
    //var  inFilter  ;
    type costomFilter = Record<string, any>;
    const inFilter: costomFilter = {};
    // eslint-disable-next-line prefer-destructuring
    inFilter[field] = params.ids[0];

    if (params.ids.length > 1)
      //inFilter = { field,  _PkValue: params.ids }
      inFilter[field] = params.ids;
    //const iquery = { _PkField: field, _PkValue: params.id, _usrToken: usrToken };
    // inFilter = { field: params.ids[0] };
    // eslint-disable-next-line prefer-destructuring
    else inFilter[field] = params.ids[0];
    //const i_Filter = { field,  _PkValue: params.ids[0]};
    // console.warn("query inFilter getmany: " , stringify(i_Filter));
    /**/
    const qFilter = { field: params.ids[0] };

    console.warn("query stringify getmany: ", stringify(inFilter));

    //  const query = { _PkField : field , _PkValue : params.id, _usrToken: usrToken};
    //Unit_Id  ?_Filter={"Unit_Id":10}&_end=25&_order=DESC&_sort=Unit_Id&_start=0
    const query = {
      _Filter: JSON.stringify(inFilter), // stringify(qFilter) //JSON.stringify([field, order]), // JSON.stringify(params.filter), //
      _sort: field,
      _order: "ASC",
      _start: 0,
      _end: 1001,
      _usrToken: usrToken,
    };

    console.log('getMany', query, resource, params)
    /*const query = {
            id: params.ids,
            _usrToken: usrToken,
        };
        */
    // console.warn("query getmany: " , stringify(query));
    const url = `${apiUrl}/${resource}GetList?${stringify(query)}`;
    // return httpClient(url).then(({ json }) => ({ data: json }));
    return httpClient(url).then(({ json }) => {
      const reParam = doMapKeysByResource(resource);
      //console.warn( "getOne: try ", reParam , " => id=", json);
      //const jsonreKeyResponse = _reKeyResponse(json, reParam);
      //console.warn( "getOne: _reKeyResponse_jsonreKeyResponse.id =", jsonreKeyResponse );
      //console.warn( "getOne: _reKeyResponse=", jsonreKeyResponse );
      return {
        data: _reKeyResponse(json, reParam), // json,
      };
    });
  },

  getManyReference: (resource, params) => {
    console.info("getmanyReference for `", resource, "`", params);

    //---------- {
    //     "Queue_Direction": "ENTRY",
    //     "Emias_Pass_Num": "Я",
    //     "Unit_Name": "Ре"
    // }
    // {
    //     "target": "Unit_Id",
    //     "id": "2",
    //     "pagination": {
    //         "page": 1,
    //         "perPage": 25
    //     },
    //     "sort": {
    //         "field": "id",
    //         "order": "DESC"
    //     },
    //     "filter": {}
    // }
    const reParam =
      resource in keysByResource ? keysByResource[resource] : null;
    let localStorageusrToken: string | undefined | null =
      sessionStorage.getItem("_usrToken");
    let usrToken: string;
    if (localStorageusrToken === null || localStorageusrToken === undefined)
      usrToken = "xxxxxxxxxxx";
    else usrToken = localStorageusrToken;

    let { field, order } = params.sort;
    if (reParam != null && field === "id") {
      field = reParam;
    }
    const keySelector = params.target;

    const xtargetFieldFilter: string = `{${keySelector}:${params.id}}`;
    //let targetFieldFilter ={};
    // targetFieldFilter.keySelector =  keySelector; // Object.(keySelector) : params.id };
    const reFilter = _reKeyFilter(params.filter, reParam);
    let formFieldFilter = JSON.stringify(reFilter);
    //var valuesReFilterVar = Object.values( reFilter );
    //console.log( "getmanyReference valuesReFilterVar=", valuesReFilterVar);
    let reFilterArray = Object.entries(reFilter);
    // console.log( "getmanyReference reFilterArray=", reFilterArray, " reFilterArray.length=" , reFilterArray.length);
    var targetFieldFilter: string;
    if (reFilterArray.length > 0) {
      const cuttingJson = JSON.stringify(reFilter).slice(1);
      targetFieldFilter = `{"${keySelector}":${params.id},${cuttingJson}`;
    } else targetFieldFilter = xtargetFieldFilter; // только селектор
    //console.log( "getmanyReference reParam=", reParam);
    //console.log( "getmanyReference reFilter=", reFilter );
    //console.log( "getmanyReference fieldFilter=", targetFieldFilter, ' field=', keySelector, ' xtargetFieldFilter=', xtargetFieldFilter);
    /*var { id, ...myFilter } = reFilter;*/
    //let  qFilter=targetFieldFilter;
    //if ( ! (reFilter === null || reFilter === undefined ))
    //      qFilter = [...reFilter, fieldFilter] ;
    //const qFilter = reFilter + fieldFilter;
    //console.log( "getmanyReference qFilter=", qFilter);
    //-----------
    const { page, perPage } = params.pagination;
    const query = {
      _Filter: targetFieldFilter, //JSON.stringify(targetFieldFilter), //JSON.stringify([field, order]), // JSON.stringify(params.filter), //
      _sort: field,
      _order: order,
      _start: (page - 1) * perPage,
      _end: page * perPage,
      _usrToken: usrToken,
    };
    // console.warn("getmanyReference query: " , stringify(query));

    /*const { field, order } = params.sort;
        const query = {
            ...fetchUtils.flattenObject(params.filter),
            [params.target]: params.id,
            _sort: field,
            _order: order,
            _start: (page - 1) * perPage,
            _end: page * perPage,
        };*/
    const url = `${apiUrl}/${resource}GetList?${stringify(query)}`;

    return httpClient(url).then(({ headers, json }) => {
      if (!headers.has("x-total-count")) {
        throw new Error(
          "The X-Total-Count header is missing in the HTTP Response. The jsonServer Data Provider expects responses for lists of resources to contain this header with the total number of results to build the pagination. If you are using CORS, did you declare X-Total-Count in the Access-Control-Expose-Headers header?"
        );
      }
      let totalCount: string | null | undefined = "10";
      let totalRecord: number = 10;

      //console.warn('x-total-count=', headers.get('x-total-count'));

      if (headers.get("x-total-count") !== undefined) {
        let contentRangeReader: string | undefined = (
          headers.get("x-total-count") as string
        )
          .split("/")
          .pop();
        if (contentRangeReader !== undefined) {
          //console.warn('1');
          totalCount = contentRangeReader.split("/").pop();
        }
        //console.warn('getmanyReference totalCount=' , totalCount);
        if (totalCount !== undefined && totalCount !== null)
          totalRecord = parseInt(totalCount, 10);
        else {
          totalRecord = 10;
        }
      }
      //totalRecord++;
      //console.warn('totalRecord===', totalRecord);
      if (totalRecord === 0) {
        //console.warn(`getmanyReference ${resource} :(totalRecord === 0) json =`, json);
        return {
          data: json,
          total: totalRecord,
        };
      } else {
        //console.warn(`getmanyReference ${resource} :(totalRecord === ${totalRecord}) json =`, json);
        return {
          data: _reKeyResponse(json, reParam), // json,
          total: totalRecord,
        };
      }
    }).catch((error) => {
      throw new Error(error.body.Fault.faultstring)
    });
  },

  update: (resource, params) => {
    const reParam =
      resource in keysByResource ? keysByResource[resource] : null;

    let field: string = reParam;
    if (field === null) {
      field = "Id";
    }
    const query = { _PkField: field, _PkValue: params.id };
    const url = `${apiUrl}/${resource}Put?${stringify(query)}`;
    // const url = `${apiUrl}/${resource}Put/${params.id}`
    const reData = _reKeyPayload(params.data, reParam);
    console.log("update: url=", url);
    // console.log( "update: reData=", reData);

    return httpClient(url, {
      method: "POST",
      body: JSON.stringify(reData),
    }).then(
      ({ json }) =>
        // console.warn( "update: _reKeyResponse=", _reKeyResponse(json, reParam) );
        // console.warn( "update: try ", reParam , " -> id=", json[reParam] );
        ({
          data: _reKeyResponse(json, reParam), // json,
        })
      //({data: json})
    ).catch((error) => {
      throw new Error(error.body.Fault.faultstring)
    });
  },

  // json-server doesn't handle filters on UPDATE route, so we fallback to calling UPDATE n times instead
  updateMany: (resource, params) =>
    Promise.all(
      params.ids.map((id) =>
        httpClient(`${apiUrl}/${resource}Put/${id}`, {
          method: "POST",
          body: JSON.stringify(params.data),
        })
      )
    )
      .then((responses) => ({ data: responses.map(({ json }) => json.id) }))
      .catch((error) => {
        throw new Error(error.body.Fault.faultstring);
      }),

// getList: async <R extends RaRecord= Transaction> (params: GetListParams):Promise<GetOneResult<R>>  => {...}

  create: (resource, params) => {
    const localStorageusrToken: string | undefined | null =
      sessionStorage.getItem("_usrToken");
    const _usrToken: string = localStorageusrToken ?? "xxxxxxxxxxx";

    let field: string = doMapKeysByResource(resource); //reParam;
    if (field === null) {
      field = "Id";
    }

    const query = { ...params.data };
    const tokenParams = { _usrToken };

    return httpClient(`${apiUrl}/${resource}Add?${stringify(tokenParams)}`, {
      method: "POST",
      body: JSON.stringify(query),
    })
      .then(({ json }) => ({
        data: { ...params.data, id: json.id },
      }) as CreateResult<any>)
      .catch((error) => {
        throw new Error(error.body.Fault.faultstring);
      });
  },

  // create: (resource, params) => {
  //     let urlString = `${apiUrl}/${resource}Add`;

  //     if (resource === "AU_Users") {
  //         urlString = `${process.env.REACT_APP_HTTPREQUEST}/Create_User`
  //         // urlString = `${apiUrl}/Create_User`
  //     }

  //     // const reParam =
  //     // resource in keysByResource ? keysByResource[resource] : null;

  //     let localStorageusrToken: string |undefined|null   = sessionStorage.getItem('_usrToken');
  //     let usrToken: string;
  //     if ( localStorageusrToken === null || localStorageusrToken === undefined )
  //         usrToken = 'xxxxxxxxxxx';
  //     else
  //         usrToken = localStorageusrToken;

  //     console.log(resource, params.data, {...params.data, _usrToken: usrToken} );
  //     // let field: string = reParam;
  //     // if (field === null ) {
  //     //     field = 'Id';
  //     // }

  //     // const queryString = [
  //     //     filterRes,
  //     //     `_end=${end}`,
  //     //     `_order=${order}`,
  //     //     `_sort=${sort}`,
  //     //     `_start=${start}`,
  //     //     `_usrToken=${token}`
  //     // ].join("&");

  //     const arr: string[] = [];

  //     // const query = { _PkField : reParam, _usrToken: usrToken};
  //     const query = {...params.data, _usrToken: usrToken}
  //     // query.forEach((item: any) => {
  //     //     const str = `${item.key=item.value}`;
  //     //     arr.push(str);
  //     // })
  //     for (const [key, value] of Object.entries(query)) {
  //         // console.log(`${key}: ${value}`);
  //         const str = `${key}=${value}`;
  //         arr.push(str);
  //       }

  //     const queryString = arr.join('&');

  //     console.log(queryString);
  //     const url = `${urlString}?${queryString}`
  //     // _usrToken=58DA1D385B975C918BF80FB5FBC2EB03
  //     // &login=КОЛОБАНОВАМВ
  //     // &password=КОЛОБАНОВАМВ
  //     // &Role_ID=4
  //     // &Usr_Name=Колобанова М.В. ,  эндоскопист
  //     return httpClient(url).then(({ json }) => ({
  //         data: { ...params.data, id: json.id },
  //     }))
  //     // return httpClient(urlString, {
  //     //     method: 'GET',
  //     //     body: JSON.stringify(params.data),
  //     // }).then(({ json }) => ({
  //     //     data: { ...params.data, id: json.id },
  //     // }))

  // },
  delete: (resource, params) => {
    let localStorageusrToken: string | undefined | null =
      sessionStorage.getItem("_usrToken");
    let _usrToken: string;
    if (localStorageusrToken === null || localStorageusrToken === undefined)
      _usrToken = "xxxxxxxxxxx";
    else _usrToken = localStorageusrToken;

    let field: string = doMapKeysByResource(resource); //reParam;
    if (field === null) {
      field = "Id";
    }

    const query = { _usrToken, id: params.id };

    return httpClient(`${apiUrl}/${resource}Delete?${stringify(query)}`, {
      // return httpClient(`${apiUrl}/${resource}Delete?${stringify(tokenParams)}${params.id}`, {
      method: "GET",
    })
      .then(({ json }) => ({ data: json }))
      .catch((error) => {
        throw new Error(error.body.Fault.faultstring);
      });
  },

  // json-server doesn't handle filters on DELETE route, so we fallback to calling DELETE n times instead
  deleteMany: (resource, params) => {    
    let localStorageusrToken: string | undefined | null =
      sessionStorage.getItem("_usrToken");
    let _usrToken: string;
    if (localStorageusrToken === null || localStorageusrToken === undefined)
      _usrToken = "xxxxxxxxxxx";
    else _usrToken = localStorageusrToken;

    let field: string = doMapKeysByResource(resource); //reParam;
    if (field === null) {
      field = "Id";
    }


    return Promise.all(
      params.ids.map((id) => {
        const query = { _usrToken, id };
        return httpClient(`${apiUrl}/${resource}Delete?${stringify(query)}`, {
          method: "GET",
        })
      }
      )
    ).then((responses) => ({ data: responses.map(({ json }) => json.id) }))
    .catch((error) => {
      throw new Error(error.body.Fault.faultstring);
    })
  },
});
