import React from "react";

import { User } from "oidc-client";

import { AccountRolesApi, AccountsApi, TenantViewModel } from "../types";

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
let api: AccountRolesApi = new AccountRolesApi(ApplicationConfig);

export const AccountRoles: React.FC<Props> = (props) => {
  let [title, setTitle] = React.useState("Account Roles");

  const params = new URLSearchParams(window.location.search);
  const account = params.get("account");
  React.useEffect(() => {
    console.debug("updating api account");
    if (account) {
      api.account = account;
    } else {
      api.account = null;
    }
  }, [account]);
  React.useEffect(() => {
    console.debug("updating api tenant");
    if (props.tenant?.id) {
      api.tenant = props.tenant?.id;
    } else {
      api.tenant = null;
    }
  }, [props.tenant]);
  React.useEffect(() => {
    console.debug("updating table title");
    if (account) {
      const accountsApi = new AccountsApi(ApplicationConfig, props.tenant?.id);
      accountsApi.readItem(props.user?.access_token, account).then((ret) => {
        if (typeof ret !== "string") {
          setTitle(`${ret.name} Roles`);
        } else {
          setTitle("Account Roles");
        }
      });
    } else {
      setTitle("Account Roles");
    }
  }, [account, props.user, props.tenant]);
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
