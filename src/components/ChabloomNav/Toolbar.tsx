import React from "react";

import {User, UserManager} from "oidc-client";

import {AppBar, createStyles, FormControlLabel, FormGroup, makeStyles, Switch, Theme, Toolbar} from "@material-ui/core";

import {TenantViewModel} from "../../models";

import {TenantManagement} from "./TenantManagement";
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
                {props.userLevel &&
                <FormGroup row>
                    {props.userLevel === "admin" &&
                    <FormControlLabel
                        control={
                            <Switch
                                checked={props.admin}
                                color="primary"
                                disabled={props.manager}
                                onChange={() => props.setAdmin(!props.admin)}/>
                        }
                        label="Admin Mode"/>}
                    {(props.userLevel === "admin" || props.userLevel === "manager") &&
                    <FormControlLabel
                        control={
                            <Switch
                                checked={props.manager}
                                color="secondary"
                                disabled={props.admin}
                                onChange={() => props.setManager(!props.manager)}/>
                        }
                        label="Manager Mode"/>}
                </FormGroup>}
                {props.user && <TenantManagement {...props}/>}
                <UserManagement {...props}/>
            </Toolbar>
        </AppBar>
    );
}
