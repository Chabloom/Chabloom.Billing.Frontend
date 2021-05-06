import * as React from "react";

import { BillSchedulesApi } from "../../api";

import { ChabloomTable, ChabloomTableColumn } from "../ChabloomTable";
import { useAppContext } from "../../AppContext";

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

export const BillSchedule: React.FC = () => {
  const { selectedAccount } = useAppContext();
  const api = React.useMemo(() => new BillSchedulesApi(selectedAccount?.id as string), [selectedAccount?.id]);
  const title = React.useMemo(() => `${selectedAccount?.name as string} Bill Schedules`, [selectedAccount?.name]);

  return (
    <ChabloomTable
      api={api}
      title={title}
      columns={columns}
      methods={["add", "edit", "delete"]}
      allowSetAccount={false}
    />
  );
};
