import { BaseViewModel } from "./modelBase";

export interface ApplicationConfigType {
  name: string;
  displayName: string;
  apiPublicAddress: string;
  jwtPublicAddress: string;
}

export interface BaseApiType<T extends BaseViewModel> {
  readItems(token: string | undefined): Promise<Array<T> | string>;

  readItem(token: string | undefined, itemId: string): Promise<T | string>;

  addItem(token: string | undefined, item: T): Promise<string | undefined>;

  editItem(token: string | undefined, item: T): Promise<string | undefined>;

  deleteItem(token: string | undefined, item: T): Promise<string | undefined>;
}

export class BaseApi<T extends BaseViewModel> {
  config: ApplicationConfigType;

  constructor(config: ApplicationConfigType) {
    this.config = config;
  }

  _readItems = async (
    token: string | undefined,
    url: string
  ): Promise<Array<T> | string> => {
    try {
      const headers = new Headers();
      if (token) {
        headers.append("Authorization", `Bearer ${token}`);
      }
      const response = await fetch(url, {
        method: "GET",
        headers: headers,
        credentials: "include",
      });
      if (response.status === 200) {
        return (await response.json()) as Array<T>;
      } else {
        return response.statusText;
      }
    } catch (e) {
      return e.message;
    }
  };

  _readItem = async (
    token: string | undefined,
    url: string
  ): Promise<T | string> => {
    try {
      const headers = new Headers();
      if (token) {
        headers.append("Authorization", `Bearer ${token}`);
      }
      const response = await fetch(url, {
        method: "GET",
        headers: headers,
        credentials: "include",
      });
      if (response.status === 200) {
        return (await response.json()) as T;
      } else {
        return response.statusText;
      }
    } catch (e) {
      return e.message;
    }
  };

  _addItem = async (
    token: string | undefined,
    url: string,
    item: T
  ): Promise<string | undefined> => {
    try {
      const headers = new Headers({
        "Content-Type": "application/json",
      });
      if (token) {
        headers.append("Authorization", `Bearer ${token}`);
      }
      const response = await fetch(url, {
        method: "POST",
        headers: headers,
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
  };

  _editItem = async (
    token: string | undefined,
    url: string,
    item: T
  ): Promise<string | undefined> => {
    try {
      const headers = new Headers({
        "Content-Type": "application/json",
      });
      if (token) {
        headers.append("Authorization", `Bearer ${token}`);
      }
      const response = await fetch(url, {
        method: "PUT",
        headers: headers,
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
  };

  _deleteItem = async (
    token: string | undefined,
    url: string
  ): Promise<string | undefined> => {
    try {
      const headers = new Headers();
      if (token) {
        headers.append("Authorization", `Bearer ${token}`);
      }
      const response = await fetch(url, {
        method: "DELETE",
        headers: headers,
      });
      if (response.status === 204) {
        return undefined;
      } else {
        return response.statusText;
      }
    } catch (e) {
      return e.message;
    }
  };
}
