import Axios from 'axios';
import { useQuery } from 'react-query';

export type Method = 'post' | 'get' | 'patch' | 'put';
export type Url = string;

const headers = {
  'Content-type': 'text/xml',
};

export const useSendXml = <T>(
  key: string,
  method: Method,
  url: Url,
  request?: any,
  deps?: any[],
  fetchManual?: boolean,
// eslint-disable-next-line max-params
) => {

  // console.log('request', request, key, url);

  const queryResult = useQuery(
    [key, deps],
    () =>
      // Axios[method](`${process.env.REACT_APP_BASEURL}${url}`, request, {
      //   headers: headers,
      // }),
      fetch(
        `${url}`, { 
           method: 'POST',
          //  mode: 'no-cors',
           headers: headers,
           body: request,
          },
        ).then(response => response.text())
        .catch(err => console.log(err)),
    {
      enabled: !fetchManual,
      staleTime: 100_000_000,
    }
  );

  const { isLoading, error, data, refetch, isFetching } = queryResult;

  let res;

  if (!isLoading && (data as any)?.data) {
    res = (data as any).data;
  }

  if (!isLoading && data) {
    res = data;
  }
  // const a = data?.text();

  console.log('isLoading', res, data);

  return { isLoading, error, res, refetch, isFetching };
};



// [{
//   id:
//   rep_type: (compare)
//   name: (compare)
//   surname: (compare)
//   patrone: (compare)
//   birth: (compare)
//   contacts: [{
//     rep_notes:
//     phone:
//   }]
// }]
