import React from "react";

import {User} from "oidc-client";

import {ClickAwayListener, Grow, IconButton, MenuItem, MenuList, Paper, Popper} from "@material-ui/core";
import {AccountCircleOutlined} from "@material-ui/icons";

interface Props {
    user: User | undefined;
}

export const ChabloomUserManagement: React.FC<Props> = (props) => {
    const anchorRef = React.useRef(null);
    const [open, setOpen] = React.useState(false);

    return (
        <div>
            <IconButton
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={() => setOpen(true)}>
                <AccountCircleOutlined/>
            </IconButton>
            <Popper
                transition
                disablePortal
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                placement="bottom-end">
                {({TransitionProps, placement}) => (
                    <Grow {...TransitionProps}
                          style={{transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'}}>
                        <Paper>
                            <ClickAwayListener onClickAway={() => setOpen(false)}>
                                <MenuList autoFocusItem={open} id="menu-list-grow">
                                    <MenuItem disabled>{props.user?.profile.name}</MenuItem>
                                    <MenuItem onClick={() => {
                                        //props.userManager.signoutRedirect().then(() => {});
                                        setOpen(false);
                                    }}>
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
}
