import * as React from "react";

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

export const TenantUser: React.FC<Props> = (props) => {
  // Initialize state variables
  const [api, setApi] = React.useState<TenantUsersApi>();
  const [title, setTitle] = React.useState("Tenant Users");

  // Update the API
  React.useEffect(() => {
    if (props.tenant.id) {
      setApi(new TenantUsersApi(props.userService, props.tenant.id));
    }
  }, [props.userService, props.tenant]);

  // Update the title
  React.useEffect(() => {
    setTitle(`Tenant Users for ${props.tenant.name}`);
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
