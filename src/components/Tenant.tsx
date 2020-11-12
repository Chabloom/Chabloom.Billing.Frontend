import React from "react";

import { User } from "oidc-client";

import { ApplicationConfig, TenantsApi } from "../types";

import { ChabloomTable, ChabloomTableColumn } from "./ChabloomTable";

interface Props {
  user: User | undefined;
}

const columns: Array<ChabloomTableColumn> = [
  {
    title: "Name",
    accessor: "name",
    type: "text",
  },
];

// The API to use
let api: TenantsApi = new TenantsApi(ApplicationConfig);

export const Tenant: React.FC<Props> = (props) => {
  const title = "Tenants";

  return (
    <ChabloomTable
      {...props}
      api={api}
      title={title}
      columns={columns}
      methods={["add", "edit"]}
      tenant={undefined}
    />
  );
};
