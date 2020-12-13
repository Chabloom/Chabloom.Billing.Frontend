import * as React from "react";

import { User } from "oidc-client";

import {
  Button,
  ButtonGroup,
  ClickAwayListener,
  FormGroup,
  Grow,
  Hidden,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from "@material-ui/core";
import { ArrowDropDown } from "@material-ui/icons";

import { TenantViewModel } from "../../types";

interface Props {
  user: User | undefined;
  authorizedTenants: Array<TenantViewModel>;
  selectedTenant: TenantViewModel | undefined;
  setSelectedTenant: CallableFunction;
}

export const TenantSelection: React.FC<Props> = (props) => {
  // True if the dropdown is open
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  // Reference to the dropdown anchor
  const anchorRef = React.useRef(null);

  return (
    <Hidden smDown implementation="css">
      <FormGroup row>
        <ButtonGroup ref={anchorRef}>
          <Button>
            {props.selectedTenant ? props.selectedTenant.name : "Select Tenant"}
          </Button>
          <Button
            disabled={props.authorizedTenants.length === 0}
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
                    {props.authorizedTenants.map((item) => {
                      return (
                        <MenuItem
                          onClick={() => {
                            if (item.id) {
                              props.setSelectedTenant(item);
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
    </Hidden>
  );
};
