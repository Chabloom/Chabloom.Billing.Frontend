import * as React from "react";

import { User } from "oidc-client";

import { AccountsApi, TenantViewModel } from "../../types";

import { ChabloomTable, ChabloomTableColumn } from "../ChabloomTable";

interface Props {
  user: User | undefined;
  tenant: TenantViewModel;
  setAccount: CallableFunction;
}

const columns: Array<ChabloomTableColumn> = [
  {
    title: "Name",
    accessor: "name",
    type: "text",
  },
  {
    title: "Address",
    accessor: "address",
    type: "text",
  },
  {
    title: "Number",
    accessor: "referenceId",
    type: "text",
  },
];

export const Account: React.FC<Props> = (props) => {
  // Initialize state variables
  const [api, setApi] = React.useState<AccountsApi>(
    new AccountsApi(props.user, props.tenant.id)
  );
  const [title, setTitle] = React.useState("Accounts");

  // Update the API
  React.useEffect(() => {
    if (props.tenant.id) {
      setApi(new AccountsApi(props.user, props.tenant.id));
    }
  }, [props.user, props.tenant]);

  // Update the title
  React.useEffect(() => {
    setTitle(`Accounts for ${props.tenant.name}`);
  }, [props.tenant]);

  // Workaround for eslint issue on the useEffect call below
  const setAccount = props.setAccount;

  // Update the title
  React.useEffect(() => {
    setAccount(undefined);
  }, [setAccount]);

  return (
    <ChabloomTable
      {...props}
      api={api}
      title={title}
      columns={columns}
      methods={["add", "edit", "delete", "payment", "paymentSchedule"]}
      setAccount={props.setAccount}
    />
  );
};
