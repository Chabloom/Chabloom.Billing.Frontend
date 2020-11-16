import React from "react";

import { User, UserManager } from "oidc-client";

import {
  AppBar,
  createStyles,
  IconButton,
  makeStyles,
  Theme,
  Toolbar,
} from "@material-ui/core";
import { Menu } from "@material-ui/icons";

import { appIsStandalone, TenantViewModel } from "../../../types";

import { ModeSelection } from "./ModeSelection";
import { TenantSelection } from "./TenantSelection";
import { UserManagement } from "./UserManagement";

import logo from "../../../logo.svg";

interface Props {
  userManager: UserManager;
  user: User | undefined;
  userLevel: "admin" | "manager" | undefined;
  tenant: TenantViewModel | undefined;
  setTenant: CallableFunction;
  admin: boolean;
  setAdmin: CallableFunction;
  manager: boolean;
  setManager: CallableFunction;
  mobileDrawerOpen: boolean;
  setMobileDrawerOpen: CallableFunction;
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
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up("sm")]: {
        display: "none",
      },
    },
  })
);

export const ChabloomToolbar: React.FC<Props> = (props) => {
  const classes = useStyles();

  return (
    <AppBar position="fixed" color="inherit" className={classes.appBar}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={() => props.setMobileDrawerOpen(!props.mobileDrawerOpen)}
          className={classes.menuButton}
        >
          <Menu />
        </IconButton>
        <div className={classes.flexGrow}>
          <img src={logo} className={classes.logo} alt="logo" />
        </div>
        {!appIsStandalone() && (props.admin || props.manager) && (
          <div className={classes.flexGrow}>
            <TenantSelection {...props} />
          </div>
        )}
        {!appIsStandalone() && <ModeSelection {...props} />}
        <UserManagement {...props} />
      </Toolbar>
    </AppBar>
  );
};
