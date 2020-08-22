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

import {ApplicationConfig} from "../settings";

import {TenantViewModel} from "../models";

import logo from "../logo.svg"

interface Props {
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

const Nav: React.FC<Props> = (props) => {
    const [data, setData] = React.useState([] as TenantViewModel[]);
    const [loaded, setLoaded] = React.useState(false);
    const [processing, setProcessing] = React.useState(false);
    const [user, setUser] = React.useState<User>();
    const [tenant, setTenant] = React.useState({} as TenantViewModel);
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const [open2, setOpen2] = React.useState(false);
    const anchorRef2 = React.useRef(null);

    const classes = useStyles();

    const getToken = async (userManager: UserManager) => {
        let token = "";
        const user = await userManager.getUser();
        if (user && !user.expired) {
            setUser(user);
            token = user.access_token;
        }
        return token;
    }

    if (!processing && !loaded) {
        setProcessing(true);
        const url = `${ApplicationConfig.apiPublicAddress}/api/tenants`;
        getToken(props.userManager).then(token => fetch(url, {
            method: "GET",
            headers: new Headers({
                "Authorization": `Bearer ${token}`,
            }),
            credentials: "include",
        }).then(response => {
            if (response.status === 200) {
                response.json().then(json => setData(json));
            }
        }).catch(e => console.log(e.message)))
            .finally(() => {
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
                    {data.length > 0 &&
                    <div>
                        <Button
                            ref={anchorRef}
                            aria-controls={open ? 'menu-list-grow' : undefined}
                            aria-haspopup="true"
                            onClick={() => setOpen(true)}
                        >
                            {tenant.name}
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
                                                {data.map((item, index) => {
                                                    return <MenuItem onClick={() => {
                                                        if (item.id) {
                                                            setTenant(item);
                                                            window.sessionStorage.setItem("TenantId", item.id);
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
                    }
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
                                                    props.userManager.signoutRedirect();
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
                        <ListItem button key="Accounts" component={NavLink} to="/accounts">
                            <ListItemIcon><AccountCircle/></ListItemIcon>
                            <ListItemText primary="Accounts"/>
                        </ListItem>
                        <ListItem button key="Bills" component={NavLink} to="/bills">
                            <ListItemIcon><Receipt/></ListItemIcon>
                            <ListItemText primary="Bills"/>
                        </ListItem>
                        <ListItem button key="BillSchedules" component={NavLink} to="/billSchedules">
                            <ListItemIcon><Schedule/></ListItemIcon>
                            <ListItemText primary="Bill Schedules"/>
                        </ListItem>
                        <ListItem button key="BillTransactions" component={NavLink} to="/billTransactions">
                            <ListItemIcon><Payment/></ListItemIcon>
                            <ListItemText primary="Bill Transactions"/>
                        </ListItem>
                    </List>
                    <Divider/>
                    <List>
                        <ListItem button key="Tenants" component={NavLink} to="/tenants">
                            <ListItemIcon><Business/></ListItemIcon>
                            <ListItemText primary="Tenants"/>
                        </ListItem>
                    </List>
                </div>
            </Drawer>
            <main className={classes.content}>
                <Toolbar/>
                {props.children}
            </main>
        </div>
    );
};

export default Nav;
