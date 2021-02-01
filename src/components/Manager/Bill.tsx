import * as React from "react";

import { BillsApi } from "../../types";

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
    title: "Due Date",
    accessor: "dueDate",
    type: "date",
  },
];

export const Bill: React.FC = () => {
  const { selectedAccount } = useAppContext();
  const api = React.useMemo(() => new BillsApi(selectedAccount?.id as string), [selectedAccount?.id]);
  const title = React.useMemo(() => `${selectedAccount?.name as string} Bills`, [selectedAccount?.name]);

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
