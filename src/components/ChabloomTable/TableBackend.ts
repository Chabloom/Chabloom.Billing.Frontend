import {UserManager} from "oidc-client";
import {OidcSettings} from "../../settings/oidc";
import {ChabloomTableDataType} from "./TableDataType";

export class ChabloomTableBackend {
    baseUrl: string;
    userManager: UserManager;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
        this.userManager = new UserManager(OidcSettings);
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

    readAll = async () => {
        const url = this.baseUrl;
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: new Headers({
                    "Authorization": `Bearer ${await this.getToken()}`,
                }),
                credentials: "include",
            });
            if (response.status === 200) {
                return ["", await response.json() as Array<ChabloomTableDataType>];
            } else {
                return [response.statusText, [] as Array<ChabloomTableDataType>];
            }
        } catch (e) {
            return [e, [] as Array<ChabloomTableDataType>];
        }
    }

    read = async (item_id: string) => {
        const url = `${this.baseUrl}/${item_id}`;
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: new Headers({
                    "Authorization": `Bearer ${await this.getToken()}`,
                }),
                credentials: "include",
            });
            if (response.status === 200) {
                return ["", await response.json() as ChabloomTableDataType];
            } else {
                return [response.statusText, {} as ChabloomTableDataType];
            }
        } catch (e) {
            return [e, {} as ChabloomTableDataType];
        }
    }

    add = async (item: ChabloomTableDataType) => {
        const url = this.baseUrl;
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: new Headers({
                    "Authorization": `Bearer ${await this.getToken()}`,
                    "Content-Type": "application/json",
                }),
                credentials: "include",
                body: JSON.stringify(item),
            });
            if (response.status === 201) {
                return "";
            } else {
                return response.statusText;
            }
        } catch (e) {
            return e;
        }
    }

    edit = async (item_id: string, item: ChabloomTableDataType) => {
        const url = `${this.baseUrl}/${item_id}`;
        try {
            const response = await fetch(url, {
                method: "PUT",
                headers: new Headers({
                    "Authorization": `Bearer ${await this.getToken()}`,
                    "Content-Type": "application/json",
                }),
                credentials: "include",
                body: JSON.stringify(item),
            });
            if (response.status === 204) {
                return "";
            } else {
                return response.statusText;
            }
        } catch (e) {
            return e;
        }
    }

    delete = async (item_id: string) => {
        const url = `${this.baseUrl}/${item_id}`;
        try {
            const response = await fetch(url, {
                method: "DELETE",
                headers: new Headers({
                    "Authorization": `Bearer ${await this.getToken()}`,
                    "Content-Type": "application/json",
                }),
            });
            if (response.status === 204) {
                return "";
            } else {
                return response.statusText;
            }
        } catch (e) {
            return e;
        }
    }
}
