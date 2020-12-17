import * as React from "react";

import { User } from "oidc-client";

import { TenantUsersApi } from "../../types";

import { ChabloomTable, ChabloomTableColumn } from "../ChabloomTable";
import { useAppContext } from "../../AppContext";

const columns: Array<ChabloomTableColumn> = [
  {
    title: "User Id",
    accessor: "userId",
    type: "text",
  },
];

export const TenantUser: React.FC = () => {
  // Initialize state variables
  const [api, setApi] = React.useState<TenantUsersApi>();
  const [title, setTitle] = React.useState("Managers");

  const context = useAppContext();
  const [user, setUser] = React.useState<User | null>(null);
  React.useEffect(() => {
    context.getUser().then((u) => setUser(u));
  }, [context.userLoaded]);

  // Update the API
  React.useEffect(() => {
    if (user) {
      if (context.selectedTenant && context.selectedTenant.id) {
        setApi(new TenantUsersApi(user, context.selectedTenant.id));
      }
    }
  }, [user, context.selectedTenant]);

  // Update the title
  React.useEffect(() => {
    setTitle(`${context.selectedTenant?.name} Managers`);
  }, [context.selectedTenant]);

  return <ChabloomTable api={api} title={title} columns={columns} methods={["add", "edit", "delete"]} />;
};
