import { UserManager } from "oidc-client";

import { OidcSettings } from "./index";

export class UserService {
  userManager: UserManager;

  constructor() {
    this.userManager = new UserManager(OidcSettings);
    this.userManager.events.addUserLoaded(() => {
      if (window.location.href.indexOf("signin-oidc") !== -1) {
        window.location.replace("/");
      }
    });
    this.userManager.events.addSilentRenewError((error) => {
      console.log(error);
    });
    this.userManager.events.addAccessTokenExpired(() => {
      this.signinSilent().then();
    });
  }

  signinRedirect = () => {
    localStorage.setItem("redirectUri", window.location.pathname);
    this.userManager.signinRedirect().then();
  };

  signinRedirectCallback = () => {
    return this.userManager.signinRedirectCallback();
  };

  signinSilent = () => {
    return this.userManager.signinSilent();
  };

  signinSilentCallback = () => {
    return this.userManager.signinSilentCallback();
  };

  signoutRedirect = () => {
    this.userManager.signoutRedirect().then();
    this.userManager.clearStaleState().then();
  };

  signoutRedirectCallback = () => {
    return this.userManager.signoutRedirectCallback();
  };

  getUser = async (require: boolean = true) => {
    const user = await this.userManager.getUser();
    if (!user && require) {
      try {
        return this.signinRedirectCallback();
      } catch (e) {
        this.signinRedirect();
      }
    }
    return user;
  };
}
