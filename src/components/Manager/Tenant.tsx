import * as React from "react";

import { TenantsApi, UserService } from "../../types";

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

export const Tenant: React.FC<Props> = (props) => {
  // Initialize state variables
  const [api, setApi] = React.useState<TenantsApi>();
  const [title, setTitle] = React.useState("Tenants");

  // Update the API
  React.useEffect(() => {
    setApi(new TenantsApi(props.userService));
  }, [props.userService]);

  // Update the title
  React.useEffect(() => {
    setTitle("Tenants");
  }, []);

  return (
    <ChabloomTable
      {...props}
      api={api}
      title={title}
      columns={columns}
      methods={["add", "edit"]}
      tenant={undefined}
      setAccount={() => {}}
    />
  );
};
