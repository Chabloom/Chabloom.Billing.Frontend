import React from "react";

import { AccountRolesApi, AccountViewModel } from "../../types";

import { ChabloomTable, ChabloomTableColumn } from "../ChabloomTable";
import { UserService } from "../UserService";

interface Props {
  userService: UserService;
  account: AccountViewModel;
}

const columns: Array<ChabloomTableColumn> = [
  {
    title: "Name",
    accessor: "name",
    type: "text",
  },
];

// The API to use
let api: AccountRolesApi = new AccountRolesApi();
// The page title
let title: string;

export const AccountRole: React.FC<Props> = (props) => {
  // Update the API and title
  React.useEffect(() => {
    api = new AccountRolesApi(props.account.id as string);
    title = `Account Roles for ${props.account.name}`;
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
