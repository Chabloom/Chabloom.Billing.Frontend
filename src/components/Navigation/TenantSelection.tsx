import * as React from "react";

import { User } from "oidc-client";

import {
  Button,
  ButtonGroup,
  ClickAwayListener,
  FormGroup,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from "@material-ui/core";
import { ArrowDropDown } from "@material-ui/icons";

import { TenantsApi, TenantViewModel } from "../../types";

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
    const getItems = async () => {
      let api: TenantsApi;
      if (props.admin) {
        // Admin mode can see all tenants
        api = new TenantsApi(props.user);
      } else {
        api = new TenantsApi(props.user, props.user?.profile.sub);
      }
      const [items, err] = await api.readItems();
      if (items && !err) {
        const itemsSorted = items.sort((a, b) => a.name.localeCompare(b.name));
        setTenants(itemsSorted);
      }
    };
    getItems().then();
  }, [props.user, props.admin]);

  // Workaround for eslint issue on the useEffect call below
  const setTenant = props.setTenant;

  // Select the tenant that was previously selected
  React.useEffect(() => {
    if (tenants && tenants.length !== 0) {
      // Attempt to find the previously selected tenant
      const oldTenantId = window.localStorage.getItem("TenantId");
      if (oldTenantId) {
        const newTenant = tenants.find((x) => x.id === oldTenantId);
        if (newTenant) {
          // Select the previously selected tenant
          setTenant(newTenant);
          return;
        }
      }
      // Use the first available tenant
      if (tenants[0] && tenants[0].id) {
        window.localStorage.setItem("TenantId", tenants[0].id);
        setTenant(tenants[0]);
      }
    }
  }, [tenants, setTenant]);

  return (
    <FormGroup row>
      <ButtonGroup ref={anchorRef}>
        <Button>{props.tenant ? props.tenant.name : "Select Tenant"}</Button>
        <Button
          disabled={tenants.length === 0}
          ref={anchorRef}
          aria-controls={dropdownOpen ? "menu-list-grow" : undefined}
          aria-haspopup="true"
          onClick={() => setDropdownOpen(true)}
        >
          <ArrowDropDown />
        </Button>
      </ButtonGroup>
      <Popper
        transition
        disablePortal
        open={dropdownOpen}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
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
              <ClickAwayListener onClickAway={() => setDropdownOpen(false)}>
                <MenuList autoFocusItem={dropdownOpen} id="menu-list-grow">
                  {tenants.map((item) => {
                    return (
                      <MenuItem
                        onClick={() => {
                          if (item.id) {
                            props.setTenant(item);
                            window.localStorage.setItem("TenantId", item.id);
                          }
                          setDropdownOpen(false);
                        }}
                      >
                        {item.name}
                      </MenuItem>
                    );
                  })}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </FormGroup>
  );
};
