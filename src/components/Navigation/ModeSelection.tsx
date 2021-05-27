import * as React from "react";

import { FormControlLabel, Hidden, RadioGroup, Switch } from "@material-ui/core";

import { useAppContext } from "../../AppContext";

export const ModeSelection: React.FC = () => {
  const { tenantRoles, selectedRole, setSelectedRole } = useAppContext();

  if (!tenantRoles || tenantRoles.length === 0) {
    return null;
  }

  return (
    <Hidden smDown implementation="css">
      <RadioGroup row>
        {tenantRoles.find((x) => x === "Admin") && (
          <FormControlLabel
            control={
              <Switch
                checked={selectedRole === "Admin"}
                color="primary"
                onChange={() => {
                  if (selectedRole === "Admin") {
                    // We are disabling admin mode
                    localStorage.setItem("UserLevel", "Manager");
                    setSelectedRole("Manager");
                  } else {
                    // We are enabling admin mode
                    localStorage.setItem("UserLevel", "Admin");
                    setSelectedRole("Admin");
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
              checked={selectedRole !== ""}
              color="secondary"
              onChange={() => {
                if (selectedRole !== "") {
                  // We are disabling manager mode
                  localStorage.setItem("UserLevel", "Customer");
                  setSelectedRole("");
                  window.location.pathname = "/";
                } else {
                  // We are enabling manager mode
                  localStorage.setItem("UserLevel", "Manager");
                  setSelectedRole("Manager");
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
