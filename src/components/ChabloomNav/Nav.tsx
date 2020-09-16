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

export const ChabloomNav: React.FC<Props> = (props) => {
    const [admin, setAdmin] = React.useState(false);
    const [manager, setManager] = React.useState(false);

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <ChabloomToolbar
                {...props}
                admin={admin}
                setAdmin={setAdmin}
                manager={manager}
                setManager={setManager}/>
            {manager &&
            <ChabloomDrawer
                {...props}
            admin={admin}
            manager={manager}/>}
            <main className={classes.content}>
                <Toolbar/>
                {props.children}
            </main>
        </div>
    );
};
