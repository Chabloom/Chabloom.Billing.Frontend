import React from "react";
import {NavLink} from "react-router-dom";

import {User, UserManager} from "oidc-client";

import {
    AppBar,
    Button,
    ClickAwayListener,
    createStyles,
    CssBaseline,
    Divider,
    Drawer,
    Grow,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    makeStyles,
    MenuItem,
    MenuList,
    Paper,
    Popper,
    Theme,
    Toolbar
} from "@material-ui/core";
import {AccountCircle, AccountCircleOutlined, Business, Home, Payment, Receipt, Schedule} from '@material-ui/icons'

import {ApplicationUsersApi, TenantsApi, TenantUsersApi} from "../api";
import {TenantViewModel} from "../models";

import logo from "../logo.svg"

interface Props {
    tenant: TenantViewModel | undefined;
    setTenant: CallableFunction;
    allTenants: Array<TenantViewModel>;
    setAllTenants: CallableFunction;
    userManager: UserManager;
}

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
        },
        drawerPaper: {
            width: drawerWidth,
        },
        drawerContainer: {
            overflow: 'auto',
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
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

export const Nav: React.FC<Props> = (props) => {
    const [loaded, setLoaded] = React.useState(false);
    const [processing, setProcessing] = React.useState(false);
    const [user, setUser] = React.useState<User>();
    const [userLevel, setUserLevel] = React.useState<"admin" | "manager" | undefined>();
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const [open2, setOpen2] = React.useState(false);
    const anchorRef2 = React.useRef(null);

    const classes = useStyles();

    const getToken = async () => {
        let token = "";
        const user = await props.userManager.getUser();
        if (user && !user.expired) {
            setUser(user);
            token = user.access_token;
            const appUsersApi = new ApplicationUsersApi();
            const appUser = await appUsersApi.readItem(token, user.profile.sub);
            if (typeof appUser !== "string") {
                setUserLevel("admin");
            } else {
                const tenantUsersApi = new TenantUsersApi();
                const tenantUser = await tenantUsersApi.readItem(token, user.profile.sub);
                if (typeof tenantUser !== "string") {
                    setUserLevel("manager");
                }
            }
        }
        return token;
    }

    const api = new TenantsApi();
    if (!processing && !loaded) {
        setProcessing(true);
        getToken().then(() => {
        });
        // Read all tenants endpoint is anonymous
        api.readItems("").then(result => {
            if (typeof result === "string") {
                console.log(result);
            } else {
                try {
                    result = result.sort((a, b) =>
                        a.name.localeCompare(b.name));
                    props.setAllTenants(result);
                    const oldTenantId = window.localStorage.getItem("TenantId");
                    if (oldTenantId) {
                        const newTenant = result.find(x => x.id === oldTenantId);
                        if (newTenant) {
                            props.setTenant(newTenant);
                        } else {
                            props.setTenant(result[0]);
                        }
                    } else {
                        props.setTenant(result[0]);
                    }
                    setLoaded(true);
                    setProcessing(false);
                } catch {
                    console.log('item read failed');
                }
            }
        }).catch(e => console.log(e.message)).finally(() => {
            setLoaded(true);
            setProcessing(false);
        });
    }

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <AppBar position="fixed" color="inherit" className={classes.appBar}>
                <Toolbar>
                    <div className={classes.logoDiv}>
                        <img src={logo} className={classes.logo} alt="logo"/>
                    </div>
                    <div>
                        <Button
                            disabled={props.allTenants.length === 0}
                            ref={anchorRef}
                            aria-controls={open ? 'menu-list-grow' : undefined}
                            aria-haspopup="true"
                            onClick={() => setOpen(true)}
                        >
                            {props.tenant ? props.tenant.name : "Select Tenant"}
                        </Button>
                        <Popper open={open} anchorEl={anchorRef.current} role={undefined} placement="bottom-end"
                                transition disablePortal>
                            {({TransitionProps, placement}) => (
                                <Grow
                                    {...TransitionProps}
                                    style={{transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'}}
                                >
                                    <Paper>
                                        <ClickAwayListener onClickAway={() => setOpen(false)}>
                                            <MenuList autoFocusItem={open} id="menu-list-grow">
                                                {props.allTenants.map(item => {
                                                    return <MenuItem onClick={() => {
                                                        if (item.id) {
                                                            props.setTenant(item);
                                                            window.localStorage.setItem("TenantId", item.id);
                                                        }
                                                        setOpen(false);
                                                    }}>{item.name}</MenuItem>;
                                                })}
                                            </MenuList>
                                        </ClickAwayListener>
                                    </Paper>
                                </Grow>
                            )}
                        </Popper>
                    </div>
                    <div>
                        <IconButton
                            ref={anchorRef2}
                            aria-controls={open2 ? 'menu-list-grow' : undefined}
                            aria-haspopup="true"
                            onClick={() => setOpen2(true)}
                        >
                            <AccountCircleOutlined/>
                        </IconButton>
                        <Popper open={open2} anchorEl={anchorRef2.current} role={undefined} placement="bottom-end"
                                transition disablePortal>
                            {({TransitionProps, placement}) => (
                                <Grow
                                    {...TransitionProps}
                                    style={{transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'}}
                                >
                                    <Paper>
                                        <ClickAwayListener onClickAway={() => setOpen2(false)}>
                                            <MenuList autoFocusItem={open2} id="menu-list-grow">
                                                <MenuItem disabled>{user?.profile.name}</MenuItem>
                                                <MenuItem onClick={() => setOpen2(false)}>Profile</MenuItem>
                                                <MenuItem onClick={() => setOpen2(false)}>My account</MenuItem>
                                                <MenuItem onClick={() => {
                                                    props.userManager.signoutRedirect().then(() => {
                                                    });
                                                    setOpen2(false);
                                                }}>Logout</MenuItem>
                                            </MenuList>
                                        </ClickAwayListener>
                                    </Paper>
                                </Grow>
                            )}
                        </Popper>
                    </div>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}>
                <Toolbar/>
                <div className={classes.drawerContainer}>
                    <List>
                        <ListItem button key="Home" component={NavLink} to="/">
                            <ListItemIcon><Home/></ListItemIcon>
                            <ListItemText primary="Home"/>
                        </ListItem>
                    </List>
                    <Divider/>
                    {userLevel === "manager" &&
                    <List>
                        <ListItem button key="Accounts" component={NavLink} to="/accounts">
                            <ListItemIcon><AccountCircle/></ListItemIcon>
                            <ListItemText primary="Accounts"/>
                        </ListItem>
                        <ListItem button key="Bills" component={NavLink} to="/bills">
                            <ListItemIcon><Receipt/></ListItemIcon>
                            <ListItemText primary="Bills"/>
                        </ListItem>
                        <ListItem button key="Schedules" component={NavLink} to="/schedules">
                            <ListItemIcon><Schedule/></ListItemIcon>
                            <ListItemText primary="Schedules"/>
                        </ListItem>
                        <ListItem button key="Transactions" component={NavLink} to="/transactions">
                            <ListItemIcon><Payment/></ListItemIcon>
                            <ListItemText primary="Transactions"/>
                        </ListItem>
                    </List>
                    }
                    <Divider/>
                    {userLevel === "admin" &&
                    <List>
                        <ListItem button key="Tenants" component={NavLink} to="/tenants">
                            <ListItemIcon><Business/></ListItemIcon>
                            <ListItemText primary="Tenants"/>
                        </ListItem>
                    </List>
                    }
                </div>
            </Drawer>
            <main className={classes.content}>
                <Toolbar/>
                {props.children}
            </main>
        </div>
    );
};
