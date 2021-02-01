import * as React from "react";

import { TenantsApi } from "../../types";

import { ChabloomTable, ChabloomTableColumn } from "../ChabloomTable";

const columns: Array<ChabloomTableColumn> = [
  {
    title: "Name",
    accessor: "name",
    type: "text",
  },
];

export const Tenant: React.FC = () => {
  const api = React.useMemo(() => new TenantsApi(), []);
  const title = React.useMemo(() => "Tenants", []);

  return <ChabloomTable api={api} title={title} columns={columns} methods={["add", "edit"]} allowSetAccount={false} />;
};
