import * as React from "react";

import { ApplicationRolesApi, UserService } from "../../types";

import { ChabloomTable, ChabloomTableColumn } from "../ChabloomTable";

interface Props {
  userService: UserService;
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
  const [api, setApi] = React.useState<ApplicationRolesApi>();
  const [title, setTitle] = React.useState("Application Roles");

  // Update the API
  React.useEffect(() => {
    setApi(new ApplicationRolesApi(props.userService));
  }, [props.userService]);

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
