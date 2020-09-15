import React from "react";

import {User} from "oidc-client";

import {AppBar, createStyles, makeStyles, Theme, Toolbar} from "@material-ui/core";

import {TenantViewModel} from "../../models";

import {ChabloomTenantManagement} from "./TenantManagement";
import {ChabloomUserManagement} from "./UserManagement";

import logo from "../../logo.svg";

interface Props {
    user: User | undefined;
    userLevel: "admin" | "manager" | undefined;
    tenant: TenantViewModel | undefined;
    setTenant: CallableFunction;
    allTenants: Array<TenantViewModel>;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
        },
        logo: {
            height: "3em",
            pointerEvents: "none",
        },
        logoDiv: {
            flexGrow: 1,
        }
    }),
);

export const ChabloomToolbar: React.FC<Props> = (props) => {
    const classes = useStyles();

    return (
        <AppBar position="fixed" color="inherit" className={classes.appBar}>
            <Toolbar>
                <div className={classes.logoDiv}>
                    <img src={logo} className={classes.logo} alt="logo"/>
                </div>
                <ChabloomTenantManagement {...props}/>
                <ChabloomUserManagement {...props}/>
            </Toolbar>
        </AppBar>
    );
}
