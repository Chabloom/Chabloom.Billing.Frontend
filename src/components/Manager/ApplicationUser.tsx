import * as React from "react";

import { ApplicationUsersApi, UserService } from "../../types";

import { ChabloomTable, ChabloomTableColumn } from "../ChabloomTable";

interface Props {
  userService: UserService;
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
  const [api, setApi] = React.useState<ApplicationUsersApi>();
  const [title, setTitle] = React.useState("Application Users");

  // Update the API
  React.useEffect(() => {
    setApi(new ApplicationUsersApi(props.userService));
  }, [props.userService]);

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
