import * as React from "react";

import { User } from "oidc-client";

import { ApplicationUsersApi } from "../../types";

import { ChabloomTable, ChabloomTableColumn } from "../ChabloomTable";

interface Props {
  user: User | undefined;
}

const columns: Array<ChabloomTableColumn> = [
  {
    title: "User Id",
    accessor: "userId",
    type: "text",
  },
];

export const ApplicationUser: React.FC<Props> = (props) => {
  // Initialize state variables
  const [api, setApi] = React.useState<ApplicationUsersApi>(
    new ApplicationUsersApi(props.user)
  );
  const [title, setTitle] = React.useState("Administrators");

  // Update the API
  React.useEffect(() => {
    setApi(new ApplicationUsersApi(props.user));
  }, [props.user]);

  // Update the title
  React.useEffect(() => {
    setTitle("Administrators");
  }, []);

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
