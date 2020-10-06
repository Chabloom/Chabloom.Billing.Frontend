import React from "react";

import { UserManager } from "oidc-client";

import { CircularProgress } from "@material-ui/core";

interface Props {
    userManager: UserManager;
}

export const OidcSignOutCallback: React.FC<Props> = (props) => {
    const redirectUri = localStorage.getItem("redirectUri");
    localStorage.removeItem("SignedIn");
    props.userManager
        .signoutRedirectCallback()
        .then(() =>
            window.location.replace(redirectUri === null ? "" : redirectUri)
        );
    return <CircularProgress />;
};
