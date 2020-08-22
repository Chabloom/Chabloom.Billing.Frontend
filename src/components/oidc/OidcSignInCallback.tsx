import React from "react";

import {UserManager} from "oidc-client";

import {CircularProgress} from "@material-ui/core";

interface Props {
    userManager: UserManager,
}

const OidcSignInCallback: React.FC<Props> = (props) => {
    const redirectUri = localStorage.getItem("redirectUri");
    props.userManager.signinRedirectCallback()
        .then(() => window.location.replace(redirectUri === null ? "" : redirectUri));
    return <CircularProgress/>
}

export default OidcSignInCallback;
