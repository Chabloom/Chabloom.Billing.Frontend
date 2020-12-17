import * as React from "react";

import { User } from "oidc-client";

import { BillSchedulesApi } from "../../types";

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
  // Initialize state variables
  const [api, setApi] = React.useState<BillSchedulesApi>();
  const [title, setTitle] = React.useState("Bill Schedules");

  const context = useAppContext();
  const [user, setUser] = React.useState<User | null>(null);
  React.useEffect(() => {
    context.getUser().then((u) => setUser(u));
  }, [context.userLoaded]);

  // Update the API
  React.useEffect(() => {
    if (user) {
      if (context.selectedAccount && context.selectedAccount.id) {
        setApi(new BillSchedulesApi(user, context.selectedAccount.id));
      }
    }
  }, [user, context.selectedAccount]);

  // Update the title
  React.useEffect(() => {
    if (context.selectedAccount) {
      setTitle(`${context.selectedAccount.name} Bill Schedules`);
    }
  }, [context.selectedAccount]);

  return <ChabloomTable api={api} title={title} columns={columns} methods={["add", "edit", "delete"]} />;
};
