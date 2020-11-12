import React from "react";

import { User } from "oidc-client";

import {
  ApplicationConfig,
  TenantsApi,
  TenantUsersApi,
  TenantViewModel,
} from "../types";

import { ChabloomTable, ChabloomTableColumn } from "./ChabloomTable";

interface Props {
  user: User | undefined;
  tenant: TenantViewModel | undefined;
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
let api: TenantUsersApi = new TenantUsersApi(ApplicationConfig);

export const TenantUser: React.FC<Props> = (props) => {
  let [title, setTitle] = React.useState("Tenant Users");

  React.useEffect(() => {
    console.debug("updating table title");
    if (props.tenant && props.tenant.id) {
      const tenantsApi = new TenantsApi(
        ApplicationConfig,
        props.user?.profile.sub
      );
      tenantsApi
        .readItem(props.user?.access_token, props.tenant.id)
        .then((ret) => {
          if (typeof ret !== "string") {
            setTitle(`${ret.name} Users`);
          } else {
            setTitle("Tenant Users");
          }
        });
    } else {
      setTitle("Tenant Users");
    }
  }, [props.user, props.tenant]);
  return (
    <ChabloomTable
      {...props}
      api={api}
      title={title}
      columns={columns}
      methods={["add", "edit", "delete"]}
    />
  );
};
