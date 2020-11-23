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

// The API to use
let api: TenantsApi;

export const Tenant: React.FC<Props> = (props) => {
  const title = "Tenants";

  // Update the API
  React.useEffect(() => {
    api = new TenantsApi(props.userService);
  }, [props.userService]);

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
