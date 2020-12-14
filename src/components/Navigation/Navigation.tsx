import * as React from "react";
import { NavLink } from "react-router-dom";

import { User, UserManager } from "oidc-client";

import {
  AppBar,
  createStyles,
  CssBaseline,
  Divider,
  Drawer,
  Hidden,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Theme,
  Toolbar,
} from "@material-ui/core";
import {
  AccountCircle,
  Business,
  Group,
  Home,
  Receipt,
  Schedule,
} from "@material-ui/icons";

import { AccountViewModel, TenantViewModel } from "../../types";

import { TenantSelection } from "./TenantSelection";
import { ModeSelection } from "./ModeSelection";
import { UserManagement } from "./UserManagement";

import logo from "../../logo.svg";

interface Props {
  user: User | undefined;
  userManager: UserManager;
  authorizedTenants: Array<TenantViewModel>;
  selectedTenant: TenantViewModel | undefined;
  setSelectedTenant: CallableFunction;
  userLevel: "admin" | "manager" | undefined;
  admin: boolean;
  setAdmin: CallableFunction;
  manager: boolean;
  setManager: CallableFunction;
  account: AccountViewModel | undefined;
  darkMode: boolean;
  setDarkMode: CallableFunction;
}

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    drawer: {
      [theme.breakpoints.up("sm")]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    drawerPaper: {
      width: drawerWidth,
    },
    logo: {
      height: "3em",
      pointerEvents: "none",
    },
    flexGrow: {
      flexGrow: 1,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
  })
);

export const Navigation: React.FC<Props> = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" color="inherit" className={classes.appBar}>
        <Toolbar>
          <div className={classes.flexGrow}>
            <img src={logo} className={classes.logo} alt="logo" />
          </div>
          {(props.admin || props.manager) && (
            <div className={classes.flexGrow}>
              <TenantSelection {...props} />
            </div>
          )}
          <ModeSelection {...props} />
          <UserManagement {...props} />
        </Toolbar>
      </AppBar>
      {(props.admin || props.manager) && (
        <Hidden smDown implementation="css">
          <nav className={classes.drawer}>
            <Drawer
              className={classes.drawer}
              variant="permanent"
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              <Toolbar />
              <div>
                <div>
                  <Divider />
                  <List>
                    <ListItem button key="home" component={NavLink} to="/">
                      <ListItemIcon>
                        <Home />
                      </ListItemIcon>
                      <ListItemText primary="Home" />
                    </ListItem>
                  </List>
                </div>
                {(props.admin || props.manager) && (
                  <div>
                    <Divider />
                    <List>
                      {props.selectedTenant && (
                        <ListItem
                          button
                          key="accounts"
                          component={NavLink}
                          to="/accounts"
                        >
                          <ListItemIcon>
                            <AccountCircle />
                          </ListItemIcon>
                          <ListItemText primary="Accounts" />
                        </ListItem>
                      )}
                      {props.account && (
                        <ListItem
                          button
                          key="bills"
                          component={NavLink}
                          to="/bills"
                        >
                          <ListItemIcon>
                            <Receipt />
                          </ListItemIcon>
                          <ListItemText primary="Bills" />
                        </ListItem>
                      )}
                      {props.account && (
                        <ListItem
                          button
                          key="billSchedules"
                          component={NavLink}
                          to="/billSchedules"
                        >
                          <ListItemIcon>
                            <Schedule />
                          </ListItemIcon>
                          <ListItemText primary="Bill Schedules" />
                        </ListItem>
                      )}
                    </List>
                  </div>
                )}
                {props.admin && (
                  <div>
                    <Divider />
                    <List>
                      <ListItem
                        button
                        key="managers"
                        component={NavLink}
                        to="/managers"
                      >
                        <ListItemIcon>
                          <Group />
                        </ListItemIcon>
                        <ListItemText primary="Managers" />
                      </ListItem>
                    </List>
                  </div>
                )}
                {props.admin && (
                  <div>
                    <Divider />
                    <List>
                      <ListItem
                        button
                        key="administrators"
                        component={NavLink}
                        to="/administrators"
                      >
                        <ListItemIcon>
                          <Group />
                        </ListItemIcon>
                        <ListItemText primary="Administrators" />
                      </ListItem>
                    </List>
                  </div>
                )}
                {props.admin && (
                  <div>
                    <Divider />
                    <List>
                      <ListItem
                        button
                        key="tenants"
                        component={NavLink}
                        to="/tenants"
                      >
                        <ListItemIcon>
                          <Business />
                        </ListItemIcon>
                        <ListItemText primary="Tenants" />
                      </ListItem>
                    </List>
                  </div>
                )}
              </div>
            </Drawer>
          </nav>
        </Hidden>
      )}
      <main className={classes.content}>
        <Toolbar />
        {props.children}
      </main>
    </div>
  );
};
