import * as React from "react";

import { TenantUsersApi } from "../../api";

import { ChabloomTable, ChabloomTableColumn } from "../ChabloomTable";
import { useAppContext } from "../../AppContext";

const columns: Array<ChabloomTableColumn> = [
  {
    title: "User Id",
    accessor: "userId",
    type: "text",
  },
];

export const TenantUser: React.FC = () => {
  const { selectedTenant } = useAppContext();
  const api = React.useMemo(() => new TenantUsersApi(selectedTenant?.id as string), [selectedTenant?.id]);
  const title = React.useMemo(() => `${selectedTenant?.name as string} Managers`, [selectedTenant?.name]);

  return (
    <ChabloomTable
      api={api}
      title={title}
      columns={columns}
      methods={["add", "edit", "delete"]}
      allowSetAccount={false}
    />
  );
};
