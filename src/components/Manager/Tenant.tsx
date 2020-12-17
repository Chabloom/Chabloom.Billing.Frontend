import * as React from "react";

import { User } from "oidc-client";

import { TenantsApi } from "../../types";

import { ChabloomTable, ChabloomTableColumn } from "../ChabloomTable";
import { useAppContext } from "../../AppContext";

const columns: Array<ChabloomTableColumn> = [
  {
    title: "Name",
    accessor: "name",
    type: "text",
  },
];

export const Tenant: React.FC = () => {
  // Initialize state variables
  const [api, setApi] = React.useState<TenantsApi>();
  const [title, setTitle] = React.useState("Tenants");

  const context = useAppContext();
  const [user, setUser] = React.useState<User | null>(null);
  React.useEffect(() => {
    context.getUser().then((u) => setUser(u));
  }, [context.userLoaded]);

  // Update the API
  React.useEffect(() => {
    if (user) {
      setApi(new TenantsApi(user));
    }
  }, [user]);

  // Update the title
  React.useEffect(() => {
    setTitle("Tenants");
  }, []);

  return <ChabloomTable api={api} title={title} columns={columns} methods={["add", "edit"]} />;
};
