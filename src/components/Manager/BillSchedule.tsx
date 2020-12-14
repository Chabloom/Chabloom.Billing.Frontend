import * as React from "react";

import { User } from "oidc-client";

import { AccountViewModel, BillSchedulesApi } from "../../types";

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
    type: "currency",
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

export const BillSchedule: React.FC<Props> = (props) => {
  // Initialize state variables
  const [api, setApi] = React.useState<BillSchedulesApi>(
    new BillSchedulesApi(props.user, props.account.id as string)
  );
  const [title, setTitle] = React.useState("Bill Schedules");

  // Update the API
  React.useEffect(() => {
    if (props.account.id) {
      setApi(new BillSchedulesApi(props.user, props.account.id));
    }
  }, [props.user, props.account]);

  // Update the title
  React.useEffect(() => {
    setTitle(`${props.account.name} Bill Schedules`);
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
