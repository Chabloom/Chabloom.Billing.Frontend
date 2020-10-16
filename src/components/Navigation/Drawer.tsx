import React from "react";
import { NavLink } from "react-router-dom";

import {
  createStyles,
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
  GroupAdd,
  Home,
  Payment,
  Receipt,
  Schedule,
} from "@material-ui/icons";

interface Props {
  userLevel: "admin" | "manager" | undefined;
  admin: boolean;
  manager: boolean;
  mobileDrawerOpen: boolean;
  setMobileDrawerOpen: CallableFunction;
}

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      [theme.breakpoints.up("sm")]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerContainer: {
      overflow: "auto",
    },
    toolbar: theme.mixins.toolbar,
  })
);

const DrawerItems: React.FC<Props> = (props) => {
  return (
    <div>
      <div>
        <Divider />
        <List>
          <ListItem button key="Home" component={NavLink} to="/">
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
            <ListItem button key="Accounts" component={NavLink} to="/accounts">
              <ListItemIcon>
                <AccountCircle />
              </ListItemIcon>
              <ListItemText primary="Accounts" />
            </ListItem>
            <ListItem button key="Bills" component={NavLink} to="/bills">
              <ListItemIcon>
                <Receipt />
              </ListItemIcon>
              <ListItemText primary="Bills" />
            </ListItem>
            <ListItem
              button
              key="Schedules"
              component={NavLink}
              to="/schedules"
            >
              <ListItemIcon>
                <Schedule />
              </ListItemIcon>
              <ListItemText primary="Schedules" />
            </ListItem>
            <ListItem
              button
              key="Transactions"
              component={NavLink}
              to="/transactions"
            >
              <ListItemIcon>
                <Payment />
              </ListItemIcon>
              <ListItemText primary="Transactions" />
            </ListItem>
          </List>
        </div>
      )}
      {(props.admin || props.manager) && (
        <div>
          <Divider />
          <List>
            <ListItem
              button
              key="accountUsers"
              component={NavLink}
              to="/accountUsers"
            >
              <ListItemIcon>
                <Group />
              </ListItemIcon>
              <ListItemText primary="Account Users" />
            </ListItem>
            <ListItem
              button
              key="accountRoles"
              component={NavLink}
              to="/accountRoles"
            >
              <ListItemIcon>
                <GroupAdd />
              </ListItemIcon>
              <ListItemText primary="Account Roles" />
            </ListItem>
            <ListItem
              button
              key="tenantUsers"
              component={NavLink}
              to="/tenantUsers"
            >
              <ListItemIcon>
                <Group />
              </ListItemIcon>
              <ListItemText primary="Tenant Users" />
            </ListItem>
            <ListItem
              button
              key="tenantRoles"
              component={NavLink}
              to="/tenantRoles"
            >
              <ListItemIcon>
                <GroupAdd />
              </ListItemIcon>
              <ListItemText primary="Tenant Roles" />
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
              key="applicationUsers"
              component={NavLink}
              to="/applicationUsers"
            >
              <ListItemIcon>
                <Group />
              </ListItemIcon>
              <ListItemText primary="Application Users" />
            </ListItem>
            <ListItem
              button
              key="applicationRoles"
              component={NavLink}
              to="/applicationRoles"
            >
              <ListItemIcon>
                <GroupAdd />
              </ListItemIcon>
              <ListItemText primary="Application Roles" />
            </ListItem>
          </List>
        </div>
      )}
      {props.admin && (
        <div>
          <Divider />
          <List>
            <ListItem button key="Tenants" component={NavLink} to="/tenants">
              <ListItemIcon>
                <Business />
              </ListItemIcon>
              <ListItemText primary="Tenants" />
            </ListItem>
          </List>
        </div>
      )}
    </div>
  );
};

export const ChabloomDrawer: React.FC<Props> = (props) => {
  const classes = useStyles();

  return (
    <nav className={classes.drawer}>
      <Hidden smUp implementation="css">
        <Drawer
          className={classes.drawer}
          variant="temporary"
          open={props.mobileDrawerOpen}
          onClose={() => props.setMobileDrawerOpen(false)}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true,
          }}
        >
          <DrawerItems {...props} />
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <Toolbar />
          <DrawerItems {...props} />
        </Drawer>
      </Hidden>
    </nav>
  );
};
