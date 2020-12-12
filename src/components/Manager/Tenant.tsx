import * as React from "react";

import { User } from "oidc-client";

import { TenantsApi } from "../../types";

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

export const Tenant: React.FC<Props> = (props) => {
  // Initialize state variables
  const [api, setApi] = React.useState<TenantsApi>(new TenantsApi(props.user));
  const [title, setTitle] = React.useState("Tenants");

  // Update the API
  React.useEffect(() => {
    setApi(new TenantsApi(props.user));
  }, [props.user]);

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
