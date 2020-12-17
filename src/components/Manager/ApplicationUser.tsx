import * as React from "react";

import { User } from "oidc-client";

import { ApplicationUsersApi } from "../../types";

import { ChabloomTable, ChabloomTableColumn } from "../ChabloomTable";
import { useAppContext } from "../../AppContext";

const columns: Array<ChabloomTableColumn> = [
  {
    title: "User Id",
    accessor: "userId",
    type: "text",
  },
];

export const ApplicationUser: React.FC = () => {
  // Initialize state variables
  const [api, setApi] = React.useState<ApplicationUsersApi>();
  const [title, setTitle] = React.useState("Administrators");

  const context = useAppContext();
  const [user, setUser] = React.useState<User | null>(null);
  React.useEffect(() => {
    context.getUser().then((u) => setUser(u));
  }, [context.userLoaded]);

  // Update the API
  React.useEffect(() => {
    if (user) {
      setApi(new ApplicationUsersApi(user));
    }
  }, [user]);

  // Update the title
  React.useEffect(() => {
    setTitle("Administrators");
  }, []);

  return <ChabloomTable api={api} title={title} columns={columns} methods={["add", "edit", "delete"]} />;
};
