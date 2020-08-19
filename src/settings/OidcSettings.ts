import {UserManagerSettings} from "oidc-client";

import {ApplicationConfig} from "./config";

export const OidcSettings: UserManagerSettings = {
    authority: ApplicationConfig.jwtPublicAddress,
    client_id: "Chabloom.Payments.Frontend",
    redirect_uri: "/signin-oidc",
    post_logout_redirect_uri: "/signout-oidc",
    response_type: "code",
    scope: "openid profile Chabloom.Payments",
    filterProtocolClaims: true,
    loadUserInfo: true
};
