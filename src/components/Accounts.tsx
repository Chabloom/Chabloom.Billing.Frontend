import React from "react";

import {UserManager} from "oidc-client";

import {ApplicationConfig} from "../settings";

import {ChabloomTable, ChabloomTableColumn} from "./ChabloomTable";

interface Props {
    userManager: UserManager;
}

const columns: Array<ChabloomTableColumn> = [
    {
        title: 'Name',
        accessor: "name",
    },
    {
        title: 'Number',
        accessor: "externalId",
    },
    {
        title: 'Primary Address',
        accessor: "primaryAddress",
    },
]

const Accounts: React.FC<Props> = (props) => {
    const baseUrl = `${ApplicationConfig.apiPublicAddress}/api/accounts`;
    return <ChabloomTable columns={columns} baseUrl={baseUrl} userManager={props.userManager}/>;
}

export default Accounts;
