import * as React from "react";

import { User } from "oidc-client";

import { AccountUsersApi, AccountViewModel } from "../../types";

import { ChabloomTable, ChabloomTableColumn } from "../ChabloomTable";

interface Props {
  user: User | undefined;
  account: AccountViewModel;
}

const columns: Array<ChabloomTableColumn> = [
  {
    title: "User Id",
    accessor: "userId",
    type: "text",
  },
  {
    title: "Account Name",
    accessor: "accountName",
    type: "text",
  },
  {
    title: "Account Id",
    accessor: "account",
    type: "text",
  },
  {
    title: "Role",
    accessor: "roleName",
    type: "text",
  },
];

export const AccountUser: React.FC<Props> = (props) => {
  // Initialize state variables
  const [api, setApi] = React.useState<AccountUsersApi>(
    new AccountUsersApi(props.user, props.account.id)
  );
  const [title, setTitle] = React.useState("Account Users");

  // Update the API
  React.useEffect(() => {
    if (props.account.id) {
      setApi(new AccountUsersApi(props.user, props.account.id));
    }
  }, [props.user, props.account]);

  // Update the title
  React.useEffect(() => {
    setTitle(`Account Users for ${props.account.name}`);
  }, [props.account]);

  return (
    <ChabloomTable
      {...props}
      api={api}
      title={title}
      columns={columns}
      methods={["add", "edit", "delete"]}
      tenant={undefined}
      setAccount={() => {}}
    />
  );
};
