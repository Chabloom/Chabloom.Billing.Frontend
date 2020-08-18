import {UserManagerSettings} from "oidc-client";

export const OidcSettings: UserManagerSettings = {
    authority: "https://localhost:44303",
    client_id: "Chabloom.Payments.Frontend",
    redirect_uri: "http://localhost:3001/signin-oidc",
    post_logout_redirect_uri: "http://localhost:3001/signout-oidc",
    response_type: "code",
    scope: "openid profile Chabloom.Payments",
    filterProtocolClaims: true,
    loadUserInfo: true
};
