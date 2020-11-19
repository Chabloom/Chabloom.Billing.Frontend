import React from "react";

import { AccountViewModel, PaymentSchedulesApi } from "../../types";

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
    title: "Day",
    accessor: "day",
    type: "number",
  },
  {
    title: "Interval",
    accessor: "monthInterval",
    type: "number",
  },
];

// The API to use
let api: PaymentSchedulesApi;
// The page title
let title: string;

export const PaymentSchedule: React.FC<Props> = (props) => {
  // Update the API and title
  React.useEffect(() => {
    api = new PaymentSchedulesApi(props.account.id as string);
    title = `Payment Schedules for ${props.account.name}`;
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
