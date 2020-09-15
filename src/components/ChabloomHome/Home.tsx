import React from "react";

import {User} from "oidc-client";

import {Grid} from "@material-ui/core";

import {TenantViewModel} from "../../models";

import {ChabloomQuickPay} from "./QuickPay";
import {ChabloomQuickView} from "./QuickView";

interface Props {
    user: User | undefined;
    tenant: TenantViewModel | undefined;
    allTenants: Array<TenantViewModel>;
}

export const ChabloomHome: React.FC<Props> = (props) => {
    return (
        <Grid container spacing={3}>
            <ChabloomQuickPay {...props}/>
            <ChabloomQuickView {...props}/>
        </Grid>
    );
}
