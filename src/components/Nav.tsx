import React from "react";
import {NavLink} from "react-router-dom";

import {User, UserManager} from "oidc-client";

import {
    AppBar,
    createStyles,
    CssBaseline,
    Divider,
    Drawer,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    makeStyles,
    Theme,
    Toolbar,
    Typography
} from "@material-ui/core";
import {AccountCircle, Business, Home, Payment, Receipt, Schedule} from '@material-ui/icons'

import logo from "../logo.svg"

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
    }),
);

interface Props {
    userManager: UserManager,
}

const Nav: React.FC<Props> = (props) => {
    const [user, setUser] = React.useState<User>();

    if (!user) {
        props.userManager.getUser()
            .then(value => setUser(value === null ? undefined : value));
    }

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <AppBar position="fixed" color="inherit" className={classes.appBar}>
                <Toolbar>
                    <Grid container justify="space-between">
                        <img src={logo} className="logo" alt="logo"/>
                        <Typography variant="h6" align="right">{user?.profile.name}</Typography>
                    </Grid>
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
