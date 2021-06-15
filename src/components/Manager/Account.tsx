import * as React from "react";

import { AccountsAPI } from "../../api";

import { ChabloomTable, ChabloomTableColumn } from "../ChabloomTable";
import { useAppContext } from "../../AppContext";

const columns: Array<ChabloomTableColumn> = [
  {
    title: "Name",
    accessor: "name",
    type: "text",
  },
  {
    title: "Address",
    accessor: "address",
    type: "text",
  },
  {
    title: "Number",
    accessor: "referenceId",
    type: "text",
  },
];

export const Account: React.FC = () => {
  const { tenant, setSelectedAccount } = useAppContext();
  const api = React.useMemo(() => new AccountsAPI(), []);
  const title = React.useMemo(() => `${tenant?.name as string} Accounts`, [tenant?.name]);

  // Unset the account
  React.useEffect(() => {
    setSelectedAccount(undefined);
  }, [setSelectedAccount]);

  return (
    <ChabloomTable
      api={api}
      title={title}
      columns={columns}
      methods={["add", "edit", "delete", "payment", "paymentSchedule"]}
      allowSetAccount={true}
    />
  );
};
