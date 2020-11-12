import React from "react";

import { User } from "oidc-client";

import { ApplicationConfig, ApplicationUsersApi } from "../types";

import { ChabloomTable, ChabloomTableColumn } from "./ChabloomTable";

interface Props {
  user: User;
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
let api: ApplicationUsersApi = new ApplicationUsersApi(ApplicationConfig);

export const ApplicationUser: React.FC<Props> = (props) => {
  const title = "Application Users";

  return (
    <ChabloomTable
      {...props}
      api={api}
      title={title}
      columns={columns}
      methods={["add", "edit", "delete"]}
      tenant={undefined}
    />
  );
};
