import * as React from "react";

import { User } from "oidc-client";

import { AccountViewModel, PaymentSchedulesApi } from "../../types";

import { ChabloomTable, ChabloomTableColumn } from "../ChabloomTable";

interface Props {
  user: User | undefined;
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

export const PaymentSchedule: React.FC<Props> = (props) => {
  // Initialize state variables
  const [api, setApi] = React.useState<PaymentSchedulesApi>(
    new PaymentSchedulesApi(props.user, props.account.id as string)
  );
  const [title, setTitle] = React.useState("Payment Schedules");

  // Update the API
  React.useEffect(() => {
    if (props.account.id) {
      setApi(new PaymentSchedulesApi(props.user, props.account.id));
    }
  }, [props.user, props.account]);

  // Update the title
  React.useEffect(() => {
    setTitle(`Payment Schedules for ${props.account.name}`);
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
