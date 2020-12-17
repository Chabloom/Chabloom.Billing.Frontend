import * as React from "react";

import { ApplicationUsersApi } from "../../types";

import { ChabloomTable, ChabloomTableColumn } from "../ChabloomTable";

const columns: Array<ChabloomTableColumn> = [
  {
    title: "User Id",
    accessor: "userId",
    type: "text",
  },
];

export const ApplicationUser: React.FC = () => {
  const api = React.useMemo(() => new ApplicationUsersApi(), []);
  const title = React.useMemo(() => "Administrators", []);

  return <ChabloomTable api={api} title={title} columns={columns} methods={["add", "edit", "delete"]} />;
};
