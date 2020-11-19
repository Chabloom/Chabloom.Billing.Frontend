import React from "react";

import { ApplicationRolesApi } from "../../types";

import { ChabloomTable, ChabloomTableColumn } from "../ChabloomTable";
import { UserService } from "../UserService";

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
let api: ApplicationRolesApi = new ApplicationRolesApi();

export const ApplicationRole: React.FC<Props> = (props) => {
  const title = "Application Roles";

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
