import React from "react";

import { AccountViewModel, PaymentsApi } from "../../types";

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
  {
    title: "Amount",
    accessor: "amount",
    type: "number",
  },
  {
    title: "Due Date",
    accessor: "dueDate",
    type: "date",
  },
];

// The API to use
let api: PaymentsApi;
// The page title
let title: string;

export const Payment: React.FC<Props> = (props) => {
  // Update the API and title
  React.useEffect(() => {
    api = new PaymentsApi(props.account.id as string);
    title = `Payments for ${props.account.name}`;
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
