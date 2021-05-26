import * as React from "react";

import { FormControlLabel, Hidden, RadioGroup, Switch } from "@material-ui/core";

import { useAppContext, UserLevel } from "../../AppContext";

export const ModeSelection: React.FC = () => {
  const { userLevel, selectedUserLevel, setSelectedUserLevel } = useAppContext();

  if (userLevel === UserLevel.Customer) {
    return null;
  }

  return (
    <Hidden smDown implementation="css">
      <RadioGroup row>
        {userLevel === UserLevel.Admin && (
          <FormControlLabel
            control={
              <Switch
                checked={selectedUserLevel === UserLevel.Admin}
                color="primary"
                onChange={() => {
                  if (selectedUserLevel === UserLevel.Admin) {
                    // We are disabling admin mode
                    localStorage.setItem("UserLevel", "Manager");
                    setSelectedUserLevel(UserLevel.Manager);
                  } else {
                    // We are enabling admin mode
                    localStorage.setItem("UserLevel", "Admin");
                    setSelectedUserLevel(UserLevel.Admin);
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
              checked={selectedUserLevel !== UserLevel.Customer}
              color="secondary"
              onChange={() => {
                if (selectedUserLevel !== UserLevel.Customer) {
                  // We are disabling manager mode
                  localStorage.setItem("UserLevel", "Customer");
                  setSelectedUserLevel(UserLevel.Customer);
                  window.location.pathname = "/";
                } else {
                  // We are enabling manager mode
                  localStorage.setItem("UserLevel", "Manager");
                  setSelectedUserLevel(UserLevel.Manager);
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
