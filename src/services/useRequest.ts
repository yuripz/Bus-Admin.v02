// мой кастомный хук, кладу в отдельный файл, импортирую потом в нужный компонент
// я использую аксиос, можно спокойно поменять на фетч, работать будет, только ../
// пропсы правильно повесить
//import Axios from 'axios';
//import { uuid } from 'uuidv4';
import { useQuery } from "react-query";
import { string } from "prop-types";
// import { SetStateAction } from "react";
type Method = "post" | "get" | "patch" | "put";
type Url = string;
export const useRequest = <T>(
  key: string,
  method: Method,
  url: Url,
  deps?: any[],
  request?: T
) => {
  // const ProcessId = uuid()
  console.warn(`useRequest deps: ${deps}`);
//   let retResponse: SetStateAction<String> = "";
  let { isLoading, error, data } = useQuery([key, deps], () =>
    // `${process.env.REACT_APP_BASEURL}${url}`
    {
      isLoading = true;
      console.warn("URL: ", `${url}`);
      return fetch(`${url}`).then((response) => response.text());
      /*

                    .then(responseString => {
                        // shownString = shownString;
                        // [shownXmlStr , setXmlStr] = useState<responseXmlStr>({shownXmlStr: responseString} );
                        retResponse = responseString;
                        isLoading = false;
                        console.warn(`useRequest responseString: ${responseString}`);
                        // console.log(xmlDoc)
                    })
                    .catch((e) => {
                            error = `Error: GetRequest_Body4Message not fetched: ${e.toString()}`;
                            // notify(`Error: GetRequest_Body4Message not fetched: ${e.toString()}`, {type: 'error'})
                        isLoading = false;
                        }
                    );
                isLoading = false;
                */
    }
  );
  console.warn(
    `useRequest return: retResponse = ${data} , isLoading=${isLoading}`
  );
  return [isLoading, error, data];
};
/*
    if (!isLoading && data?.data) {
        res = data.data; // тут по структуре ответа с бэка вытаскиваю именно данные, там несколько доп полей рядом прилетает у меня
    }
     */
// возвращаю состояние загрузки, ошибку, данные и рефетч - для повторной перезагрузки данных из эндпойнта
// return { isLoading, error, res, refetch };

// export default { useRequest };
