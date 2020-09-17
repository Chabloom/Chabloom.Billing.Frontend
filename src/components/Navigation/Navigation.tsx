import React from "react";

import {User, UserManager} from "oidc-client";

import {createStyles, CssBaseline, makeStyles, Theme, Toolbar} from "@material-ui/core";

import {TenantViewModel} from "../../models";

import {ChabloomDrawer} from "./Drawer";
import {ChabloomToolbar} from "./Toolbar";

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
        root: {
            display: 'flex',
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
        },
    }),
);

export const Navigation: React.FC<Props> = (props) => {
    const [mobileDrawerOpen, setMobileDrawerOpen] = React.useState(false);

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <ChabloomToolbar
                {...props}
                mobileDrawerOpen={mobileDrawerOpen}
                setMobileDrawerOpen={setMobileDrawerOpen}/>
            {props.manager &&
            <ChabloomDrawer
                {...props}
                admin={props.admin}
                manager={props.manager}
                mobileDrawerOpen={mobileDrawerOpen}
                setMobileDrawerOpen={setMobileDrawerOpen}/>}
            <main className={classes.content}>
                <Toolbar/>
                {props.children}
            </main>
        </div>
    );
};
