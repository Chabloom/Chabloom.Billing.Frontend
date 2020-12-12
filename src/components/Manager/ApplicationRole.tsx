import * as React from "react";

import { User } from "oidc-client";

import { ApplicationRolesApi } from "../../types";

import { ChabloomTable, ChabloomTableColumn } from "../ChabloomTable";

interface Props {
  user: User | undefined;
}

const columns: Array<ChabloomTableColumn> = [
  {
    title: "Name",
    accessor: "name",
    type: "text",
  },
];

export const ApplicationRole: React.FC<Props> = (props) => {
  // Initialize state variables
  const [api, setApi] = React.useState<ApplicationRolesApi>(
    new ApplicationRolesApi(props.user)
  );
  const [title, setTitle] = React.useState("Application Roles");

  // Update the API
  React.useEffect(() => {
    setApi(new ApplicationRolesApi(props.user));
  }, [props.user]);

  // Update the title
  React.useEffect(() => {
    setTitle("Application Roles");
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
