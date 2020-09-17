import React from "react";

import {User} from "oidc-client";

import {
    Button,
    ButtonGroup,
    ClickAwayListener,
    FormGroup,
    Grow,
    MenuItem,
    MenuList,
    Paper,
    Popper
} from "@material-ui/core";
import {ArrowDropDown} from "@material-ui/icons";

import {TenantsApi} from "../../api";
import {TenantViewModel} from "../../models";

interface Props {
    user: User | undefined;
    tenant: TenantViewModel | undefined;
    setTenant: CallableFunction;
    admin: boolean;
    manager: boolean;
}

export const TenantSelection: React.FC<Props> = (props) => {
    const [tenants, setTenants] = React.useState([] as Array<TenantViewModel>);
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    React.useEffect(() => {
        if (props.user && !props.user.expired) {
            const api = new TenantsApi();
            api.readItems(props.user.access_token).then(result => {
                if (typeof result !== "string") {
                    try {
                        result = result.sort((a, b) =>
                            a.name.localeCompare(b.name));
                        setTenants(result);
                        // Attempt to find the previously selected tenant
                        let newTenant;
                        const oldTenantId = window.localStorage.getItem("TenantId");
                        if (oldTenantId) {
                            newTenant = result.find(x => x.id === oldTenantId);
                        }
                        // Set the new tenant
                        if (newTenant) {
                            props.setTenant(newTenant);
                        } else {
                            props.setTenant(result[0]);
                        }
                    } catch {
                        console.log('item read failed');
                    }
                }
            }).catch(e => console.log(e.message));
        }
    }, [props.user, props.setTenant]);

    if (props.admin || props.manager) {
        return (
            <FormGroup row>
                <ButtonGroup ref={anchorRef}>
                    <Button>{props.tenant ? props.tenant.name : "Select Tenant"}</Button>
                    <Button
                        disabled={tenants.length === 0}
                        ref={anchorRef}
                        aria-controls={open ? 'menu-list-grow' : undefined}
                        aria-haspopup="true"
                        onClick={() => setOpen(true)}>
                        <ArrowDropDown/>
                    </Button>
                </ButtonGroup>
                <Popper
                    transition
                    disablePortal
                    open={open}
                    anchorEl={anchorRef.current}
                    role={undefined}
                    placement="bottom-start">
                    {({TransitionProps, placement}) => (
                        <Grow {...TransitionProps}
                              style={{transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'}}>
                            <Paper>
                                <ClickAwayListener onClickAway={() => setOpen(false)}>
                                    <MenuList autoFocusItem={open} id="menu-list-grow">
                                        {tenants.map(item => {
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
            </FormGroup>
        );
    }
    return null;
}
