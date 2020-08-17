import {UserManager, UserManagerSettings, WebStorageStateStore} from "oidc-client";
import React from "react";

export const AuthSettings: UserManagerSettings = {
    authority:"https://localhost:44334",
    client_id:"Chabloom.Payments.Frontend",
    redirect_uri:"http://localhost:3000/signin-oidc",
    post_logout_redirect_uri:"http://localhost:3000/logout/callback",
    response_type:"code",
    scope:"Chabloom.PaymentsAPI openid profile",
    filterProtocolClaims: true,
    loadUserInfo: true,
    userStore: new WebStorageStateStore({store: window.sessionStorage})
};

class AuthService {
    userManager: UserManager;

    constructor() {
        // Set up the user manager
        this.userManager = new UserManager(AuthSettings);
        // Add user loaded callback
        this.userManager.events.addUserLoaded((user) => {
            if (window.location.href.indexOf("signin-oidc") !== -1) {
                this.navigateToScreen();
            }
        });
        // Silent renew error callback
        this.userManager.events.addSilentRenewError((e) => {
            console.log("silent renew error", e.message);
        });
        // Access token expired callback
        this.userManager.events.addAccessTokenExpired(() => {
            console.log("token expired");
            this.signinSilent();
        });
    }

    signinRedirectCallback = () => {
        this.userManager.signinRedirectCallback().then(() => "");
    };

    getUser = async () => {
        const user = await this.userManager.getUser();
        if (!user) {
            return await this.userManager.signinRedirectCallback();
        }
        return user;
    };

    parseJwt = (token: string) => {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace("-", "+").replace("_", "/");
        return JSON.parse(window.atob(base64));
    };

    signinRedirect = () => {
        localStorage.setItem("redirectUri", window.location.pathname);
        this.userManager.signinRedirect({});
    };

    navigateToScreen = () => {
        window.location.replace("/");
    };

    isAuthenticated = () => {
        if (!AuthSettings.authority ||
            !AuthSettings.client_id) {
            return false;
        }
        const key = `oidc.user:${AuthSettings.authority}:${AuthSettings.client_id}`;
        const item = sessionStorage.getItem(key);
        if (!item) {
            return false;
        }
        const oidcStorage = JSON.parse(item)

        return (!!oidcStorage && !!oidcStorage.access_token)
    };

    signinSilent = () => {
        this.userManager.signinSilent()
            .then((user) => {
                console.log("signed in", user);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    signinSilentCallback = () => {
        this.userManager.signinSilentCallback();
    };

    createSigninRequest = () => {
        return this.userManager.createSigninRequest();
    };

    logout = () => {
        this.userManager.signoutRedirect({
            id_token_hint: localStorage.getItem("id_token")
        });
        this.userManager.clearStaleState();
    };

    signoutRedirectCallback = () => {
        this.userManager.signoutRedirectCallback().then(() => {
            localStorage.clear();
            if (process.env.REACT_APP_PUBLIC_URL) {
                window.location.replace(process.env.REACT_APP_PUBLIC_URL);
            }
        });
        this.userManager.clearStaleState();
    };
}

const authService = new AuthService();
const authContext = React.createContext<AuthService>(authService);

export const AuthConsumer = authContext.Consumer;

export const AuthProvider: React.FC = (props) => {
    return <authContext.Provider value={authService}>{props.children}</authContext.Provider>;
}
