import {UserManager} from "oidc-client";

import {BaseApiType} from "../../api";
import {BaseViewModel} from "../../models";

export class ChabloomTableBackend {
    api: BaseApiType<BaseViewModel>;
    userManager: UserManager;

    constructor(api: BaseApiType<BaseViewModel>, userManager: UserManager) {
        this.api = api;
        this.userManager = userManager;
    }

    getToken = async () => {
        let token = "";
        const user = await this.userManager.getUser();
        if (user && !user.expired) {
            token = user.access_token;
        } else {
            localStorage.setItem("redirectUri", window.location.pathname);
            this.userManager.signinRedirect({}).then();
        }
        return token;
    }

    readItems = async () => this.api.readItems(await this.getToken())
    readItem = async () => this.api.readItem(await this.getToken())
    addItem = async (item: any) => this.api.addItem(await this.getToken(), item)
    editItem = async (item: any) => this.api.editItem(await this.getToken(), item)
    deleteItem = async (item: any) => this.api.deleteItem(await this.getToken(), item)
}
