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

import { UserService } from "../../types";

interface Props {
  userService: UserService;
  darkMode: boolean;
  setDarkMode: CallableFunction;
}

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

const UserManagementAnonymous: React.FC<Props> = (props) => {
  const anchorRef = React.useRef(null);
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <IconButton
        ref={anchorRef}
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        onClick={() => setOpen(true)}
      >
        <AccountCircleOutlined />
      </IconButton>
      <Popper
        transition
        disablePortal
        open={open}
        anchorEl={anchorRef.current}
        placement="bottom-end"
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={() => setOpen(false)}>
                <MenuList autoFocusItem={open} id="menu-list-grow">
                  <MenuItem>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={props.darkMode}
                          color="primary"
                          onChange={() =>
                            toggleDarkMode(props.darkMode, props.setDarkMode)
                          }
                        />
                      }
                      label="Dark Mode"
                    />
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setOpen(false);
                      localStorage.setItem(
                        "redirectUri",
                        window.location.pathname
                      );
                      props.userService.signinRedirect();
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
    </div>
  );
};

interface SignedInProps {
  user: User;
  userService: UserService;
  darkMode: boolean;
  setDarkMode: CallableFunction;
}

const UserManagementSignedIn: React.FC<SignedInProps> = (props) => {
  const anchorRef = React.useRef(null);
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <IconButton
        ref={anchorRef}
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        onClick={() => setOpen(true)}
      >
        {props.user.profile.name && (
          <Avatar>
            {props.user.profile.name.substring(0, 1).toUpperCase()}
          </Avatar>
        )}
        {!props.user.profile.name && <AccountCircleOutlined />}
      </IconButton>
      <Popper
        transition
        disablePortal
        open={open}
        anchorEl={anchorRef.current}
        placement="bottom-end"
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={() => setOpen(false)}>
                <MenuList autoFocusItem={open} id="menu-list-grow">
                  <MenuItem disabled>{props.user.profile.name}</MenuItem>
                  <MenuItem>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={props.darkMode}
                          color="primary"
                          onChange={() =>
                            toggleDarkMode(props.darkMode, props.setDarkMode)
                          }
                        />
                      }
                      label="Dark Mode"
                    />
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setOpen(false);
                      localStorage.setItem(
                        "redirectUri",
                        window.location.pathname
                      );
                      props.userService.signoutRedirect();
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
    </div>
  );
};

export const UserManagement: React.FC<Props> = (props) => {
  const [user, setUser] = React.useState<User>();

  React.useEffect(() => {
    const getUser = async () => {
      const u = await props.userService.getUser(false);
      if (u) {
        setUser(u);
      }
    };
    getUser().then();
  }, [props.userService]);

  if (user) {
    return <UserManagementSignedIn {...props} user={user} />;
  }
  return <UserManagementAnonymous {...props} />;
};
