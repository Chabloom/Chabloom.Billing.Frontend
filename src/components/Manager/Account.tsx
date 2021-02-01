import * as React from "react";

import { AccountsApi } from "../../types";

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
  const { selectedTenant, setSelectedAccount } = useAppContext();
  const api = React.useMemo(() => new AccountsApi(selectedTenant?.id as string), [selectedTenant?.id]);
  const title = React.useMemo(() => `${selectedTenant?.name as string} Accounts`, [selectedTenant?.name]);

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
