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
}

export const TenantSelection: React.FC<Props> = (props) => {
    // Tenants available for the user to select
    const [tenants, setTenants] = React.useState([] as Array<TenantViewModel>);
    // True if the dropdown is open
    const [dropdownOpen, setDropdownOpen] = React.useState(false);
    // Reference to the dropdown anchor
    const anchorRef = React.useRef(null);

    // Get tenants that the user is authorized to select
    React.useEffect(() => {
        if (props.user && !props.user.expired) {
            let api: TenantsApi
            if (props.admin) {
                // Admin mode can see all tenants
                api = new TenantsApi();
            } else {
                api = new TenantsApi(props.user.profile.sub);
            }
            api.readItems(props.user.access_token).then(ret => {
                if (typeof ret !== "string") {
                    ret = ret.sort((a, b) =>
                        a.name.localeCompare(b.name));
                    setTenants(ret);
                }
            })
        }
    }, [props.admin, props.user]);

    // Workaround for eslint issue on the useEffect call below
    const setTenant = props.setTenant;

    // Select the tenant that was previously selected
    React.useEffect(() => {
        console.log('setting tenant');
        if (tenants && tenants.length !== 0) {
            // Attempt to find the previously selected tenant
            const oldTenantId = window.localStorage.getItem("TenantId");
            if (oldTenantId) {
                const newTenant = tenants.find(x => x.id === oldTenantId);
                if (newTenant) {
                    // Select the previously selected tenant
                    setTenant(newTenant);
                    return
                }
            }
            // Use the first available tenant
            setTenant(tenants[0]);
        }
    }, [tenants, setTenant]);

    return (
        <FormGroup row>
            <ButtonGroup ref={anchorRef}>
                <Button>{props.tenant ? props.tenant.name : "Select Tenant"}</Button>
                <Button
                    disabled={tenants.length === 0}
                    ref={anchorRef}
                    aria-controls={dropdownOpen ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    onClick={() => setDropdownOpen(true)}>
                    <ArrowDropDown/>
                </Button>
            </ButtonGroup>
            <Popper
                transition
                disablePortal
                open={dropdownOpen}
                anchorEl={anchorRef.current}
                role={undefined}
                placement="bottom-start">
                {({TransitionProps, placement}) => (
                    <Grow {...TransitionProps}
                          style={{transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'}}>
                        <Paper>
                            <ClickAwayListener onClickAway={() => setDropdownOpen(false)}>
                                <MenuList autoFocusItem={dropdownOpen} id="menu-list-grow">
                                    {tenants.map(item => {
                                        return <MenuItem onClick={() => {
                                            if (item.id) {
                                                props.setTenant(item);
                                                window.localStorage.setItem("TenantId", item.id);
                                            }
                                            setDropdownOpen(false);
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
