import React from "react";

import { User } from "oidc-client";

import {
  TenantRolesApi,
  TenantsApi,
  TenantViewModel,
} from "chabloom-payments-typescript";

import { ApplicationConfig } from "../settings/config";

import { ChabloomTable, ChabloomTableColumn } from "./ChabloomTable";

interface Props {
  user: User | undefined;
  tenant: TenantViewModel | undefined;
}

const columns: Array<ChabloomTableColumn> = [
  {
    title: "Name",
    accessor: "name",
    type: "text",
  },
];

// The API to use
let api: TenantRolesApi = new TenantRolesApi(ApplicationConfig);

export const TenantRoles: React.FC<Props> = (props) => {
  let [title, setTitle] = React.useState("Tenant Roles");

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
            setTitle(`${ret.name} Roles`);
          } else {
            setTitle("Tenant Roles");
          }
        });
    } else {
      setTitle("Tenant Roles");
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
