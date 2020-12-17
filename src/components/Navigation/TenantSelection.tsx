import * as React from "react";

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

import { useAppContext, UserLevel } from "../../AppContext";

export const TenantSelection: React.FC = () => {
  const context = useAppContext();

  // True if the dropdown is open
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  // Reference to the dropdown anchor
  const anchorRef = React.useRef(null);

  if (context.selectedUserLevel === UserLevel.Customer) {
    return null;
  }

  return (
    <Hidden smDown implementation="css">
      <FormGroup row>
        <ButtonGroup ref={anchorRef}>
          <Button>{context.selectedTenant ? context.selectedTenant.name : "Select Tenant"}</Button>
          <Button
            disabled={context.authorizedTenants.length === 0}
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
                transformOrigin: placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={() => setDropdownOpen(false)}>
                  <MenuList autoFocusItem={dropdownOpen} id="menu-list-grow">
                    {context.authorizedTenants.map((item) => {
                      return (
                        <MenuItem
                          onClick={() => {
                            if (item.id) {
                              context.setSelectedTenant(item);
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
