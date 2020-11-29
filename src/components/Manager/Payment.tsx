import * as React from "react";

import { AccountViewModel, PaymentsApi, UserService } from "../../types";

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

export const Payment: React.FC<Props> = (props) => {
  // Initialize state variables
  const [api, setApi] = React.useState<PaymentsApi>();
  const [title, setTitle] = React.useState("Payments");

  // Update the API
  React.useEffect(() => {
    if (props.account.id) {
      setApi(new PaymentsApi(props.userService, props.account.id));
    }
  }, [props.userService, props.account]);

  // Update the title
  React.useEffect(() => {
    setTitle(`Payments for ${props.account.name}`);
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
