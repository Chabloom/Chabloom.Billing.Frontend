import React from "react";

import {FormControlLabel, FormGroup, Switch} from "@material-ui/core";

interface Props {
    userLevel: "admin" | "manager" | undefined;
    admin: boolean;
    setAdmin: CallableFunction;
    manager: boolean;
    setManager: CallableFunction;
}

export const ModeSelection: React.FC<Props> = (props) => {
    React.useEffect(() => {
        if (props.userLevel === "admin" || props.userLevel === "manager") {
            const storedLevel = localStorage.getItem("UserLevel");
            if (storedLevel === "admin") {
                props.setAdmin(true);
            } else if (storedLevel === "manager") {
                props.setManager(true);
            }
        }
    }, [props]);

    return (
        <FormGroup row>
            {props.userLevel === "admin" &&
            <FormControlLabel
                control={
                    <Switch
                        checked={props.admin}
                        color="primary"
                        onChange={() => {
                            if (props.admin) {
                                // We are disabling admin mode
                                localStorage.removeItem("UserLevel");
                            } else {
                                // We are enabling admin mode
                                localStorage.setItem("UserLevel", "admin");
                            }
                            props.setAdmin(!props.admin);
                            props.setManager(false);
                        }}/>
                }
                label="Admin Mode"/>
            }
            {(props.userLevel === "admin" || props.userLevel === "manager") &&
            <FormControlLabel
                control={
                    <Switch
                        checked={props.manager}
                        color="secondary"
                        onChange={() => {
                            if (props.manager) {
                                // We are disabling manager mode
                                localStorage.removeItem("UserLevel");
                            } else {
                                // We are enabling manager mode
                                localStorage.setItem("UserLevel", "manager");
                            }
                            props.setAdmin(false);
                            props.setManager(!props.manager);
                        }}/>
                }
                label="Manager Mode"/>
            }
        </FormGroup>
    );
}
