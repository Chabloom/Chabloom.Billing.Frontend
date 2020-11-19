import React from "react";

import { AccountsApi, TenantViewModel } from "../../types";

import { ChabloomTable, ChabloomTableColumn } from "../ChabloomTable";
import { UserService } from "../UserService";

interface Props {
  userService: UserService;
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
// The page title
let title: string;

export const Account: React.FC<Props> = (props) => {
  // Update the API and title
  React.useEffect(() => {
    api = new AccountsApi(props.tenant.id as string);
    title = `Accounts for ${props.tenant.name}`;
  }, [props.tenant]);

  // Workaround for eslint issue on the useEffect call below
  const setAccount = props.setAccount;

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
