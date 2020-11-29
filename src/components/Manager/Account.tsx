import * as React from "react";

import { AccountsApi, TenantViewModel, UserService } from "../../types";

import { ChabloomTable, ChabloomTableColumn } from "../ChabloomTable";

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

export const Account: React.FC<Props> = (props) => {
  // Initialize state variables
  const [api, setApi] = React.useState<AccountsApi>();
  const [title, setTitle] = React.useState("Accounts");

  // Update the API
  React.useEffect(() => {
    if (props.tenant.id) {
      setApi(new AccountsApi(props.userService, props.tenant.id));
    }
  }, [props.userService, props.tenant]);

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
