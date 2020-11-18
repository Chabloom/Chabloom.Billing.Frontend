import React from "react";

import { User } from "oidc-client";

import { TenantUsersApi, TenantViewModel } from "../../types";

import { ChabloomTable, ChabloomTableColumn } from "../ChabloomTable";

interface Props {
  user: User | undefined;
  tenant: TenantViewModel;
}

const columns: Array<ChabloomTableColumn> = [
  {
    title: "User Id",
    accessor: "userId",
    type: "text",
  },
  {
    title: "Tenant Name",
    accessor: "tenantName",
    type: "text",
  },
  {
    title: "Tenant Id",
    accessor: "tenant",
    type: "text",
  },
  {
    title: "Role",
    accessor: "roleName",
    type: "text",
  },
];

// The API to use
let api: TenantUsersApi = new TenantUsersApi();
// The page title
let title: string;

export const TenantUser: React.FC<Props> = (props) => {
  // Update the API and title
  React.useEffect(() => {
    api = new TenantUsersApi(props.tenant.id as string);
    title = `Tenant Users for ${props.tenant.name}`;
  }, [props.tenant]);

  return (
    <ChabloomTable
      {...props}
      api={api}
      title={title}
      columns={columns}
      methods={["add", "edit", "delete"]}
      setAccount={() => {}}
    />
  );
};
