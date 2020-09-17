import React from "react";

import {User, UserManager} from "oidc-client";

import {AppBar, createStyles, makeStyles, Theme, Toolbar} from "@material-ui/core";

import {TenantViewModel} from "../../models";

import {ModeSelection} from "./ModeSelection";
import {TenantSelection} from "./TenantSelection";
import {UserManagement} from "./UserManagement";

import logo from "../../logo.svg";

interface Props {
    user: User | undefined;
    userManager: UserManager;
    userLevel: "admin" | "manager" | undefined;
    tenant: TenantViewModel | undefined;
    setTenant: CallableFunction;
    allTenants: Array<TenantViewModel>;
    admin: boolean;
    setAdmin: CallableFunction;
    manager: boolean;
    setManager: CallableFunction;
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
        flexGrow: {
            flexGrow: 1,
        }
    }),
);

export const ChabloomToolbar: React.FC<Props> = (props) => {
    const classes = useStyles();

    return (
        <AppBar position="fixed" color="inherit" className={classes.appBar}>
            <Toolbar>
                <div className={classes.flexGrow}>
                    <img src={logo} className={classes.logo} alt="logo"/>
                </div>
                <div className={classes.flexGrow}>
                    <TenantSelection {...props}/>
                </div>
                <ModeSelection {...props}/>
                <UserManagement {...props}/>
            </Toolbar>
        </AppBar>
    );
}
