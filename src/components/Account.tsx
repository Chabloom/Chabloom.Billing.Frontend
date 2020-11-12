import React from "react";

import { User } from "oidc-client";

import { ApplicationConfig, AccountsApi, TenantViewModel } from "../types";

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
  {
    title: "Number",
    accessor: "externalId",
    type: "text",
  },
  {
    title: "Primary Address",
    accessor: "primaryAddress",
    type: "text",
  },
];

// The API to use
let api: AccountsApi = new AccountsApi();

export const Account: React.FC<Props> = (props) => {
  let [title, setTitle] = React.useState("Accounts");

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
    if (props.tenant?.name) {
      setTitle(`${props.tenant.name} Accounts`);
    } else {
      setTitle("Accounts");
    }
  }, [props.tenant]);
  return (
    <ChabloomTable
      {...props}
      api={api}
      title={title}
      columns={columns}
      methods={["add", "edit", "delete", "payment", "paymentSchedule"]}
    />
  );
};
