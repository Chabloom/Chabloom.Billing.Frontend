import React from "react";

import { TenantRolesApi, TenantViewModel } from "../../types";

import { ChabloomTable, ChabloomTableColumn } from "../ChabloomTable";
import { UserService } from "../UserService";

interface Props {
  userService: UserService;
  tenant: TenantViewModel;
}

const columns: Array<ChabloomTableColumn> = [
  {
    title: "Name",
    accessor: "name",
    type: "text",
  },
];

// The API to use
let api: TenantRolesApi = new TenantRolesApi();
// The page title
let title: string;

export const TenantRole: React.FC<Props> = (props) => {
  // Update the API and title
  React.useEffect(() => {
    api = new TenantRolesApi(props.tenant.id as string);
    title = `Tenant Roles for ${props.tenant.name}`;
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
