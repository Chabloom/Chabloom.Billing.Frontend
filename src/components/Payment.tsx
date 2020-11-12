import React from "react";

import { User } from "oidc-client";

import { AccountsApi, PaymentsApi } from "../types";

import { ChabloomTable, ChabloomTableColumn } from "./ChabloomTable";

interface Props {
  user: User | undefined;
}

const columns: Array<ChabloomTableColumn> = [
  {
    title: "Name",
    accessor: "name",
    type: "text",
  },
  {
    title: "Amount",
    accessor: "amount",
    type: "number",
  },
  {
    title: "Due Date",
    accessor: "dueDate",
    type: "date",
  },
];

// The API to use
let api: PaymentsApi;

export const Payment: React.FC<Props> = (props) => {
  let [title, setTitle] = React.useState("Payments");

  // Get the currently specified account
  const params = new URLSearchParams(window.location.search);
  const account = params.get("account");
  // Update the API
  React.useEffect(() => {
    console.debug("updating api");
    if (account) {
      api = new PaymentsApi(account);
    }
  }, [account]);
  // Update the title
  React.useEffect(() => {
    console.debug("updating title");
    if (account) {
      const accountsApi = new AccountsApi();
      accountsApi.readItem(props.user?.access_token, account).then((ret) => {
        if (typeof ret !== "string") {
          setTitle(`${ret.name} Payments`);
          return;
        }
      });
    }
    setTitle("Payments");
  }, [account, props.user?.access_token]);

  return (
    <ChabloomTable
      {...props}
      api={api}
      title={title}
      columns={columns}
      methods={["add", "edit", "delete"]}
      tenant={undefined}
    />
  );
};
