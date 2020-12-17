import * as React from "react";

import { User } from "oidc-client";

import { AccountsApi } from "../../types";

import { ChabloomTable, ChabloomTableColumn } from "../ChabloomTable";
import { useAppContext } from "../../AppContext";

const columns: Array<ChabloomTableColumn> = [
  {
    title: "Name",
    accessor: "name",
    type: "text",
  },
  {
    title: "Address",
    accessor: "address",
    type: "text",
  },
  {
    title: "Number",
    accessor: "referenceId",
    type: "text",
  },
];

export const Account: React.FC = () => {
  // Initialize state variables
  const [api, setApi] = React.useState<AccountsApi>();
  const [title, setTitle] = React.useState("Accounts");

  const context = useAppContext();
  const [user, setUser] = React.useState<User | null>(null);
  React.useEffect(() => {
    context.getUser().then((u) => setUser(u));
  }, [context.userLoaded]);

  // Update the API
  React.useEffect(() => {
    if (user) {
      if (context.selectedTenant && context.selectedTenant.id) {
        setApi(new AccountsApi(user, context.selectedTenant.id));
      }
    }
  }, [user, context.selectedTenant]);

  // Update the title
  React.useEffect(() => {
    if (context.selectedTenant) {
      setTitle(`${context.selectedTenant.name} Accounts`);
    }
  }, [context.selectedTenant]);

  // Unset the account
  React.useEffect(() => {
    context.setSelectedAccount(undefined);
  }, []);

  return (
    <ChabloomTable
      api={api}
      title={title}
      columns={columns}
      methods={["add", "edit", "delete", "payment", "paymentSchedule"]}
    />
  );
};
