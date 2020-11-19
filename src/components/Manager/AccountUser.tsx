import React from "react";

import { AccountUsersApi, AccountViewModel } from "../../types";

import { ChabloomTable, ChabloomTableColumn } from "../ChabloomTable";
import { UserService } from "../UserService";

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
let api: AccountUsersApi = new AccountUsersApi();
// The page title
let title: string;

export const AccountUser: React.FC<Props> = (props) => {
  // Update the API and title
  React.useEffect(() => {
    api = new AccountUsersApi(props.account.id as string);
    title = `Account Users for ${props.account.name}`;
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
