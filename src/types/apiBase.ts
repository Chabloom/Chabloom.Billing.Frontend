import { BaseViewModel } from "./modelBase";
import { UserService } from "./UserService";

export interface BaseApiType<T extends BaseViewModel> {
  readItems(): Promise<[Array<T> | undefined, string]>;

  readItem(itemId: string): Promise<[T | undefined, string]>;

  addItem(item: T): Promise<[T | undefined, string]>;

  editItem(item: T): Promise<[T | undefined, string]>;

  deleteItem(item: T): Promise<string | undefined>;
}

export class BaseApi<T extends BaseViewModel> {
  userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  _readItems = async (
    url: string,
    isAuthenticated: boolean = true
  ): Promise<[Array<T> | undefined, string]> => {
    try {
      let response: Response;
      if (isAuthenticated) {
        const headers = new Headers();
        const user = await this.userService.getUser();
        if (user) {
          headers.append("Authorization", `Bearer ${user.access_token}`);
        }
        response = await fetch(url, {
          method: "GET",
          headers: headers,
          credentials: "include",
        });
      } else {
        response = await fetch(url, {
          method: "GET",
        });
      }
      if (response.status === 200) {
        const retJson = await response.json();
        return [retJson, ""];
      } else {
        return [undefined, response.statusText];
      }
    } catch (e) {
      return [undefined, e.message];
    }
  };

  _readItem = async (
    url: string,
    isAuthenticated: boolean = true
  ): Promise<[T | undefined, string]> => {
    try {
      let response: Response;
      if (isAuthenticated) {
        const headers = new Headers();
        const user = await this.userService.getUser();
        if (user) {
          headers.append("Authorization", `Bearer ${user.access_token}`);
        }
        response = await fetch(url, {
          method: "GET",
          headers: headers,
          credentials: "include",
        });
      } else {
        response = await fetch(url, {
          method: "GET",
        });
      }
      if (response.status === 200) {
        const retJson = await response.json();
        return [retJson, ""];
      } else {
        return [undefined, response.statusText];
      }
    } catch (e) {
      return [undefined, e.message];
    }
  };

  _addItem = async (
    url: string,
    item: T,
    isAuthenticated: boolean = true
  ): Promise<[T | undefined, string]> => {
    try {
      let response: Response;
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      if (isAuthenticated) {
        const user = await this.userService.getUser();
        if (user) {
          headers.append("Authorization", `Bearer ${user.access_token}`);
        }
        response = await fetch(url, {
          method: "POST",
          headers: headers,
          credentials: "include",
          body: JSON.stringify(item),
        });
      } else {
        response = await fetch(url, {
          method: "POST",
          headers: headers,
          body: JSON.stringify(item),
        });
      }
      if (response.status === 201) {
        const retJson = await response.json();
        return [retJson, ""];
      } else {
        return [undefined, response.statusText];
      }
    } catch (e) {
      return [undefined, e.message];
    }
  };

  _editItem = async (
    url: string,
    item: T,
    isAuthenticated: boolean = true
  ): Promise<[T | undefined, string]> => {
    try {
      let response: Response;
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      if (isAuthenticated) {
        const user = await this.userService.getUser();
        if (user) {
          headers.append("Authorization", `Bearer ${user.access_token}`);
        }
        response = await fetch(url, {
          method: "PUT",
          headers: headers,
          credentials: "include",
          body: JSON.stringify(item),
        });
      } else {
        response = await fetch(url, {
          method: "PUT",
          headers: headers,
          body: JSON.stringify(item),
        });
      }
      if (response.status === 200) {
        const retJson = await response.json();
        return [retJson, ""];
      } else {
        return [undefined, response.statusText];
      }
    } catch (e) {
      return [undefined, e.message];
    }
  };

  _deleteItem = async (
    url: string,
    isAuthenticated: boolean = true
  ): Promise<string | undefined> => {
    try {
      let response: Response;
      if (isAuthenticated) {
        const headers = new Headers();
        const user = await this.userService.getUser();
        if (user) {
          headers.append("Authorization", `Bearer ${user.access_token}`);
        }
        response = await fetch(url, {
          method: "DELETE",
          headers: headers,
        });
      } else {
        response = await fetch(url, {
          method: "DELETE",
        });
      }
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
