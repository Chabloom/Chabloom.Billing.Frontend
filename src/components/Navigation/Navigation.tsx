import * as React from "react";
import { NavLink } from "react-router-dom";

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
import { AccountCircle, Business, Group, Home, Receipt, Schedule } from "@material-ui/icons";

import { ModeSelection } from "./ModeSelection";
import { UserManagement } from "./UserManagement";

import { useAppContext, UserLevel } from "../../AppContext";

import icon from "../../common/images/chabloom-icon.svg";

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

export const Navigation: React.FC = (props) => {
  const { tenant, selectedAccount, selectedUserLevel } = useAppContext();

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" color="inherit" className={classes.appBar}>
        <Toolbar>
          <div className={classes.flexGrow}>
            <img src={icon} className={classes.logo} alt="logo" />
          </div>
          <ModeSelection />
          <UserManagement />
        </Toolbar>
      </AppBar>
      {selectedUserLevel !== UserLevel.Customer && (
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
                <div>
                  <Divider />
                  <List>
                    {tenant && (
                      <ListItem button key="accounts" component={NavLink} to="/accounts">
                        <ListItemIcon>
                          <AccountCircle />
                        </ListItemIcon>
                        <ListItemText primary="Accounts" />
                      </ListItem>
                    )}
                    {selectedAccount && (
                      <ListItem button key="bills" component={NavLink} to="/bills">
                        <ListItemIcon>
                          <Receipt />
                        </ListItemIcon>
                        <ListItemText primary="Bills" />
                      </ListItem>
                    )}
                    {selectedAccount && (
                      <ListItem button key="billSchedules" component={NavLink} to="/billSchedules">
                        <ListItemIcon>
                          <Schedule />
                        </ListItemIcon>
                        <ListItemText primary="Bill Schedules" />
                      </ListItem>
                    )}
                  </List>
                </div>
                {selectedUserLevel === UserLevel.Admin && (
                  <div>
                    <Divider />
                    <List>
                      <ListItem button key="managers" component={NavLink} to="/managers">
                        <ListItemIcon>
                          <Group />
                        </ListItemIcon>
                        <ListItemText primary="Managers" />
                      </ListItem>
                    </List>
                  </div>
                )}
                {selectedUserLevel === UserLevel.Admin && (
                  <div>
                    <Divider />
                    <List>
                      <ListItem button key="administrators" component={NavLink} to="/administrators">
                        <ListItemIcon>
                          <Group />
                        </ListItemIcon>
                        <ListItemText primary="Administrators" />
                      </ListItem>
                    </List>
                  </div>
                )}
                {selectedUserLevel === UserLevel.Admin && (
                  <div>
                    <Divider />
                    <List>
                      <ListItem button key="tenants" component={NavLink} to="/tenants">
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
