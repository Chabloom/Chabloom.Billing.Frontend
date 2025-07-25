import * as React from "react";

import { TenantsAPI } from "../../api";

import { ChabloomTable, ChabloomTableColumn } from "../ChabloomTable";

const columns: Array<ChabloomTableColumn> = [
  {
    title: "Name",
    accessor: "name",
    type: "text",
  },
];

export const Tenant: React.FC = () => {
  const api = React.useMemo(() => new TenantsAPI(), []);
  const title = React.useMemo(() => "Tenants", []);

  return <ChabloomTable api={api} title={title} columns={columns} methods={["add", "edit"]} allowSetAccount={false} />;
};
