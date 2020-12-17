import * as React from "react";

import { FormControlLabel, Hidden, RadioGroup, Switch } from "@material-ui/core";

import { useAppContext, UserLevel } from "../../AppContext";

export const ModeSelection: React.FC = () => {
  const context = useAppContext();

  if (context.userLevel === UserLevel.Customer) {
    return null;
  }

  return (
    <Hidden smDown implementation="css">
      <RadioGroup row>
        {context.userLevel === UserLevel.Admin && (
          <FormControlLabel
            control={
              <Switch
                checked={context.selectedUserLevel === UserLevel.Admin}
                color="primary"
                onChange={() => {
                  if (context.selectedUserLevel === UserLevel.Admin) {
                    // We are disabling admin mode
                    localStorage.setItem("UserLevel", "Manager");
                    context.setSelectedUserLevel(UserLevel.Manager);
                  } else {
                    // We are enabling admin mode
                    localStorage.setItem("UserLevel", "Admin");
                    context.setSelectedUserLevel(UserLevel.Admin);
                  }
                }}
              />
            }
            label="Admin Mode"
          />
        )}
        <FormControlLabel
          control={
            <Switch
              checked={context.selectedUserLevel !== UserLevel.Customer}
              color="secondary"
              onChange={() => {
                if (context.selectedUserLevel !== UserLevel.Customer) {
                  // We are disabling manager mode
                  localStorage.setItem("UserLevel", "Customer");
                  context.setSelectedUserLevel(UserLevel.Customer);
                  window.location.pathname = "/";
                } else {
                  // We are enabling manager mode
                  localStorage.setItem("UserLevel", "Manager");
                  context.setSelectedUserLevel(UserLevel.Manager);
                }
              }}
            />
          }
          label="Manager Mode"
        />
      </RadioGroup>
    </Hidden>
  );
};
