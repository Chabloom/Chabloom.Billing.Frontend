import React from "react";

import { User } from "oidc-client";

import { ApplicationRolesApi } from "../types";

import { ChabloomTable, ChabloomTableColumn } from "./ChabloomTable";

interface Props {
  user: User;
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
