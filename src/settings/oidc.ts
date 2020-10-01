import {UserManagerSettings} from "oidc-client";

import {AppConfig} from "./config";

export const OidcSettings: UserManagerSettings = {
    authority: AppConfig.jwtPublicAddress,
    client_id: "Chabloom.Payments.Frontend",
    redirect_uri: "PUBLIC_ADDRESS/signin-oidc",
    post_logout_redirect_uri: "PUBLIC_ADDRESS/signout-oidc",
    response_type: "code",
    scope: "openid profile Chabloom.Payments",
    filterProtocolClaims: true,
    loadUserInfo: true
};
