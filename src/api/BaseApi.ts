import {BaseViewModel} from "../models";

export interface BaseApiType<T extends BaseViewModel> {
    readItems(token: string): Promise<Array<T> | string>;

    readItem(token: string, itemId: string): Promise<T | string>;

    addItem(token: string, item: T): Promise<string | undefined>;

    editItem(token: string, item: T): Promise<string | undefined>;

    deleteItem(token: string, item: T): Promise<string | undefined>;
}

export class BaseApi<T extends BaseViewModel> {
    _readItems = async (token: string, url: string): Promise<Array<T> | string> => {
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: new Headers({
                    "Authorization": `Bearer ${token}`,
                }),
                credentials: "include",
            });
            if (response.status === 200) {
                return await response.json() as Array<T>;
            } else {
                return response.statusText;
            }
        } catch (e) {
            return e.message;
        }
    }

    _readItem = async (token: string, url: string): Promise<T | string> => {
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: new Headers({
                    "Authorization": `Bearer ${token}`,
                }),
                credentials: "include",
            });
            if (response.status === 200) {
                return await response.json() as T;
            } else {
                return response.statusText;
            }
        } catch (e) {
            return e.message;
        }
    }

    _addItem = async (token: string, url: string, item: T): Promise<string | undefined> => {
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: new Headers({
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                }),
                credentials: "include",
                body: JSON.stringify(item),
            });
            if (response.status === 201) {
                return undefined;
            } else {
                return response.statusText;
            }
        } catch (e) {
            return e.message;
        }
    }

    _editItem = async (token: string, url: string, item: T): Promise<string | undefined> => {
        try {
            const response = await fetch(url, {
                method: "PUT",
                headers: new Headers({
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                }),
                credentials: "include",
                body: JSON.stringify(item),
            });
            if (response.status === 204) {
                return undefined;
            } else {
                return response.statusText;
            }
        } catch (e) {
            return e.message;
        }
    }

    _deleteItem = async (token: string, url: string): Promise<string | undefined> => {
        try {
            const response = await fetch(url, {
                method: "DELETE",
                headers: new Headers({
                    "Authorization": `Bearer ${token}`,
                }),
            });
            if (response.status === 204) {
                return undefined;
            } else {
                return response.statusText;
            }
        } catch (e) {
            return e.message;
        }
    }
}
