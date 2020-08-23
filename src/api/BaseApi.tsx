export interface BaseApiType<T> {
    readItems(token: string): Promise<[string | undefined, Array<T> | undefined]>;
    readItem(token: string): Promise<[string | undefined, T | undefined]>;
    addItem(token: string, item: T): Promise<string | undefined>;
    editItem(token: string, item: T): Promise<string | undefined>;
    deleteItem(token: string, item: T): Promise<string | undefined>;
}

export class BaseApi<T> {
    _readItems = async (token: string, url: string): Promise<[string | undefined, Array<T> | undefined]> => {
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: new Headers({
                    "Authorization": `Bearer ${token}`,
                }),
                credentials: "include",
            });
            if (response.status === 200) {
                return [undefined, await response.json() as Array<T>];
            } else {
                return [response.statusText, undefined];
            }
        } catch (e) {
            return [e, undefined];
        }
    }

    _readItem = async (token: string, url: string): Promise<[string | undefined, T | undefined]> => {
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: new Headers({
                    "Authorization": `Bearer ${token}`,
                }),
                credentials: "include",
            });
            if (response.status === 200) {
                return [undefined, await response.json() as T];
            } else {
                return [response.statusText, undefined];
            }
        } catch (e) {
            return [e, undefined];
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
            return e;
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
            return e;
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
