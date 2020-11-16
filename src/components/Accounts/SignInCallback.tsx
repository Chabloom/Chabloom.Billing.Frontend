import React from "react";

import { UserManager } from "oidc-client";

import { CircularProgress } from "@material-ui/core";

interface Props {
  userManager: UserManager;
}

export const SignInCallback: React.FC<Props> = (props) => {
  const redirectUri = localStorage.getItem("redirectUri");
  localStorage.setItem("SignedIn", "true");
  props.userManager
    .signinRedirectCallback()
    .then(() =>
      window.location.replace(redirectUri === null ? "" : redirectUri)
    );
  return <CircularProgress />;
};
