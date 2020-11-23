import * as React from "react";

import { AccountUsersApi, AccountViewModel, UserService } from "../../types";

import { ChabloomTable, ChabloomTableColumn } from "../ChabloomTable";

interface Props {
  userService: UserService;
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

// The API to use
let api: AccountUsersApi;
// The page title
let title: string;

export const AccountUser: React.FC<Props> = (props) => {
  // Update the API and title
  React.useEffect(() => {
    api = new AccountUsersApi(props.userService, props.account.id as string);
    title = `Account Users for ${props.account.name}`;
  }, [props.userService, props.account]);

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
