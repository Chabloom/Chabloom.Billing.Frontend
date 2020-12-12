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
  {
    title: "Role",
    accessor: "roleName",
    type: "text",
  },
];

export const ApplicationUser: React.FC<Props> = (props) => {
  // Initialize state variables
  const [api, setApi] = React.useState<ApplicationUsersApi>(
    new ApplicationUsersApi(props.user)
  );
  const [title, setTitle] = React.useState("Application Users");

  // Update the API
  React.useEffect(() => {
    setApi(new ApplicationUsersApi(props.user));
  }, [props.user]);

  // Update the title
  React.useEffect(() => {
    setTitle("Application Users");
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
