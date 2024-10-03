/* eslint-disable react/jsx-pascal-case */
import { useState, useEffect } from "react";
import {
  SimpleForm,
  SelectInput,
  useNotify,
  SaveButton,
  Toolbar,
  useRecordContext,
  useRefresh,
} from "react-admin";
import { Box, Typography } from "@mui/material";

import * as Agent from "../../services/ConnectionsServices";

type QueryListItem = {
  Unit_Id: number;
  Unit_Name: string;
};

const CustomToolbar = () => (
  <Toolbar>
    <SaveButton />
  </Toolbar>
);

export const NamedUnitAside = () => {
  const [isLoading, setIsLoading] = useState(true);
  const notify = useNotify();
  const record = useRecordContext();
  const [queryList, setQueryList] = useState<QueryListItem[]>([]);
  const refresh = useRefresh();

  const localStorageusrToken: string | undefined | null =
  sessionStorage.getItem("_usrToken");

  useEffect(() => {
    if (!!localStorageusrToken && localStorageusrToken !== null && record?.id) {
      Agent.Unit_All.getList(
        localStorageusrToken
        ).then((res) => {
          setQueryList(res);
          return setIsLoading(false);
        })
      .catch((err: any) => notify(
            `Error: Unit_AllGetList not fetched: ${err.resultMessage.toString()}`,
            { type: "error" }
          )
      )
    }
  }, [record]);

  const postSubmit = (props: any) => {
    const { listId, id } = props;
    if (!!localStorageusrToken && localStorageusrToken !== null && record?.id) {
      Agent.NamedListMember.add(listId, id, localStorageusrToken)
      .catch((err: any) => {
        console.log(err);
        return notify(
            `Error: Unit_AllGetList not fetched: ${err.resultMessage.toString()}`,
            { type: "error" }
          );
        })
      .finally(() => refresh());
    }
  };

  return (
    <SimpleForm
      onSubmit={postSubmit}
      toolbar={<CustomToolbar />}
    >
      <Box sx={{ width: "200px", margin: "1em" }}>
        <Typography variant="h6">Добавить связь с юнитом</Typography>
        <Typography variant="body2">Выбрать из свободных вариантов</Typography>
        {!isLoading ? (
          <SelectInput
            style={{maxWidth: "100%"}}
            choices={queryList}
            optionText="Unit_Name"
            optionValue="Unit_Id"
            label="List"
            source="listId"
            required
          />
        ) : (
          <></>
        )}
      </Box>
    </SimpleForm>
  );
};
