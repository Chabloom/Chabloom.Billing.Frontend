import React from "react";

import { ApplicationRolesApi, UserService } from "../../types";

import { ChabloomTable, ChabloomTableColumn } from "../ChabloomTable";

interface Props {
  userService: UserService;
}

const columns: Array<ChabloomTableColumn> = [
  {
    title: "Name",
    accessor: "name",
    type: "text",
  },
];

// The API to use
let api: ApplicationRolesApi;

export const ApplicationRole: React.FC<Props> = (props) => {
  const title = "Application Roles";

  // Update the API
  React.useEffect(() => {
    api = new ApplicationRolesApi(props.userService);
  }, [props.userService]);

  return (
    <ChabloomTable
      {...props}
      api={api}
      title={title}
      columns={columns}
      methods={["add", "edit", "delete"]}
      tenant={undefined}
      setAccount={() => {}}
    />
  );
};
