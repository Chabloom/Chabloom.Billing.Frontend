import * as React from "react";

import { User } from "oidc-client";

import {
  Avatar,
  ClickAwayListener,
  FormControlLabel,
  Grow,
  IconButton,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Switch,
} from "@material-ui/core";
import { AccountCircleOutlined } from "@material-ui/icons";

import { useAppContext } from "../../AppContext";

const toggleDarkMode = (darkMode: boolean, setDarkMode: CallableFunction) => {
  if (darkMode) {
    // We are disabling dark mode
    localStorage.setItem("DarkMode", "false");
  } else {
    // We are enabling dark mode
    localStorage.setItem("DarkMode", "true");
  }
  setDarkMode(!darkMode);
};

const UserManagementAnonymous: React.FC = () => {
  const anchorRef = React.useRef(null);
  const [open, setOpen] = React.useState(false);

  const context = useAppContext();

  return (
    <React.Fragment>
      <IconButton
        ref={anchorRef}
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        onClick={() => setOpen(true)}
      >
        <AccountCircleOutlined />
      </IconButton>
      <Popper transition disablePortal open={open} anchorEl={anchorRef.current} placement="bottom-end">
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={() => setOpen(false)}>
                <MenuList autoFocusItem={open} id="menu-list-grow">
                  <MenuItem>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={context.darkMode}
                          color="primary"
                          onChange={() => toggleDarkMode(context.darkMode, context.setDarkMode)}
                        />
                      }
                      label="Dark Mode"
                    />
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setOpen(false);
                      localStorage.setItem("redirectUri", window.location.pathname);
                      context.userManager.signinRedirect().then();
                    }}
                  >
                    Sign In/Register
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </React.Fragment>
  );
};

const UserManagementSignedIn: React.FC = () => {
  const anchorRef = React.useRef(null);
  const [open, setOpen] = React.useState(false);

  const context = useAppContext();
  const [user, setUser] = React.useState<User | null>(null);
  React.useEffect(() => {
    context.getUser().then((u) => setUser(u));
  }, [context.userLoaded]);

  if (!user) {
    return null;
  }

  return (
    <React.Fragment>
      <IconButton
        ref={anchorRef}
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        onClick={() => setOpen(true)}
      >
        {user.profile.name && <Avatar>{user.profile.name.substring(0, 1).toUpperCase()}</Avatar>}
        {!user.profile.name && <AccountCircleOutlined />}
      </IconButton>
      <Popper transition disablePortal open={open} anchorEl={anchorRef.current} placement="bottom-end">
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={() => setOpen(false)}>
                <MenuList autoFocusItem={open} id="menu-list-grow">
                  <MenuItem disabled>{user.profile.name}</MenuItem>
                  <MenuItem>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={context.darkMode}
                          color="primary"
                          onChange={() => toggleDarkMode(context.darkMode, context.setDarkMode)}
                        />
                      }
                      label="Dark Mode"
                    />
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setOpen(false);
                      localStorage.setItem("redirectUri", window.location.pathname);
                      context.userManager.signoutRedirect().then();
                    }}
                  >
                    Logout
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </React.Fragment>
  );
};

export const UserManagement: React.FC = () => {
  const context = useAppContext();

  if (context.userLoaded) {
    return <UserManagementSignedIn />;
  } else {
    return <UserManagementAnonymous />;
  }
};
