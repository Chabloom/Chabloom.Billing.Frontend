import React from "react";

import {Button, ClickAwayListener, Grow, MenuItem, MenuList, Paper, Popper} from "@material-ui/core";

import {TenantViewModel} from "../../models";

interface Props {
    tenant: TenantViewModel | undefined;
    setTenant: CallableFunction;
    allTenants: Array<TenantViewModel>;
}

export const ChabloomTenantManagement: React.FC<Props> = (props) => {
    const anchorRef = React.useRef(null);
    const [open, setOpen] = React.useState(false);

    return (
        <div>
            <Button
                disabled={props.allTenants.length === 0}
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={() => setOpen(true)}>
                {props.tenant ? props.tenant.name : "Select Tenant"}
            </Button>
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
                                    {props.allTenants.map(item => {
                                        return <MenuItem onClick={() => {
                                            if (item.id) {
                                                props.setTenant(item);
                                                window.localStorage.setItem("TenantId", item.id);
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
    );
}
