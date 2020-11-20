import React from "react";

import { ApplicationUsersApi, UserService } from "../../types";

import { ChabloomTable, ChabloomTableColumn } from "../ChabloomTable";

interface Props {
  userService: UserService;
}

const columns: Array<ChabloomTableColumn> = [
  {
    title: "User Id",
    accessor: "userId",
    type: "text",
  },
  {
    title: "Role",
    accessor: "roleName",
    type: "text",
  },
];

// The API to use
let api: ApplicationUsersApi;

export const ApplicationUser: React.FC<Props> = (props) => {
  const title = "Application Users";

  // Update the API
  React.useEffect(() => {
    api = new ApplicationUsersApi(props.userService);
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
