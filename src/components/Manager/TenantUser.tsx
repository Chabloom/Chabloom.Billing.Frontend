import * as React from "react";

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

export const TenantUser: React.FC<Props> = (props) => {
  // Initialize state variables
  const [api, setApi] = React.useState<TenantUsersApi>(
    new TenantUsersApi(props.user, props.tenant.id)
  );
  const [title, setTitle] = React.useState("Tenant Users");

  // Update the API
  React.useEffect(() => {
    if (props.tenant.id) {
      setApi(new TenantUsersApi(props.user, props.tenant.id));
    }
  }, [props.user, props.tenant]);

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
