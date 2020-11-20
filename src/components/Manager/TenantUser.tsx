import React from "react";

import { TenantUsersApi, TenantViewModel, UserService } from "../../types";

import { ChabloomTable, ChabloomTableColumn } from "../ChabloomTable";

interface Props {
  userService: UserService;
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
let api: TenantUsersApi;
// The page title
let title: string;

export const TenantUser: React.FC<Props> = (props) => {
  // Update the API and title
  React.useEffect(() => {
    api = new TenantUsersApi(props.userService, props.tenant.id as string);
    title = `Tenant Users for ${props.tenant.name}`;
  }, [props.userService, props.tenant]);

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
