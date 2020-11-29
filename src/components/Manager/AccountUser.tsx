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

export const AccountUser: React.FC<Props> = (props) => {
  // Initialize state variables
  const [api, setApi] = React.useState<AccountUsersApi>();
  const [title, setTitle] = React.useState("Account Users");

  // Update the API
  React.useEffect(() => {
    if (props.account.id) {
      setApi(new AccountUsersApi(props.userService, props.account.id));
    }
  }, [props.userService, props.account]);

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
