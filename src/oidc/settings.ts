import {UserManagerSettings} from "oidc-client";

export const OidcSettings: UserManagerSettings = {
    authority: "https://localhost:44334",
    client_id: "Chabloom.Payments.Frontend",
    redirect_uri: "http://localhost:3000/signin-oidc",
    post_logout_redirect_uri: "http://localhost:3000/signout-oidc",
    response_type: "code",
    scope: "Chabloom.PaymentsAPI openid profile",
    filterProtocolClaims: true,
    loadUserInfo: true
};
