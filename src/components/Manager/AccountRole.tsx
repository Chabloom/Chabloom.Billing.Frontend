import * as React from "react";

import { AccountRolesApi, AccountViewModel, UserService } from "../../types";

import { ChabloomTable, ChabloomTableColumn } from "../ChabloomTable";

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

export const AccountRole: React.FC<Props> = (props) => {
  // Initialize state variables
  const [api, setApi] = React.useState<AccountRolesApi>();
  const [title, setTitle] = React.useState("Account Roles");

  // Update the API
  React.useEffect(() => {
    if (props.account.id) {
      setApi(new AccountRolesApi(props.userService, props.account.id));
    }
  }, [props.userService, props.account]);

  // Update the title
  React.useEffect(() => {
    setTitle(`Account Roles for ${props.account.name}`);
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
