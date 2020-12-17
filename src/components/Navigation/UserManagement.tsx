import * as React from "react";

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

  const { userManager, darkMode, setDarkMode } = useAppContext();

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
                          checked={darkMode}
                          color="primary"
                          onChange={() => toggleDarkMode(darkMode, setDarkMode)}
                        />
                      }
                      label="Dark Mode"
                    />
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setOpen(false);
                      localStorage.setItem("redirectUri", window.location.pathname);
                      userManager.signinRedirect().then();
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

  const { userManager, userName, userToken, darkMode, setDarkMode } = useAppContext();

  if (!userToken) {
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
        <Avatar>{userName.substring(0, 1).toUpperCase()}</Avatar>
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
                  <MenuItem disabled>{userName}</MenuItem>
                  <MenuItem>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={darkMode}
                          color="primary"
                          onChange={() => toggleDarkMode(darkMode, setDarkMode)}
                        />
                      }
                      label="Dark Mode"
                    />
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setOpen(false);
                      localStorage.setItem("redirectUri", window.location.pathname);
                      userManager.signoutRedirect().then();
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
  const { userToken } = useAppContext();

  if (userToken) {
    return <UserManagementSignedIn />;
  } else {
    return <UserManagementAnonymous />;
  }
};
