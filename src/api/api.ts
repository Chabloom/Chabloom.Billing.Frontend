import { BaseViewModel } from "./model";

export interface BaseAPIType<T extends BaseViewModel> {
  data(): T | Array<T> | undefined;
  lastError(): string;
}

export interface FullAPIType<T extends BaseViewModel> extends BaseAPIType<T> {
  create(viewModel: T, token: string | undefined): Promise<boolean>;
  delete(id: string, token: string | undefined): Promise<boolean>;
  deleteViewModel(viewModel: T, token: string | undefined): Promise<boolean>;
  read(id: string, token: string | undefined): Promise<boolean>;
  readAll(token: string | undefined): Promise<boolean>;
  update(id: string, viewModel: T, token: string | undefined): Promise<boolean>;
  updateViewModel(viewModel: T, token: string | undefined): Promise<boolean>;
}

export interface CreateDeleteAPIType<T extends BaseViewModel> extends BaseAPIType<T> {
  create(viewModel: T, token: string | undefined): Promise<boolean>;
  delete(viewModel: T, token: string | undefined): Promise<boolean>;
  read(id: string, token: string | undefined): Promise<boolean>;
  readAll(token: string | undefined): Promise<boolean>;
}

export interface ReadOnlyAPIType<T extends BaseViewModel> extends BaseAPIType<T> {
  read(id: string, token: string | undefined): Promise<boolean>;
  readAll(token: string | undefined): Promise<boolean>;
}

export class BaseAPI<T extends BaseViewModel> implements BaseAPIType<T> {
  _baseUrl: string;
  _data: T | Array<T> | undefined;
  _lastError: string;

  constructor(baseUrl: string) {
    this._baseUrl = baseUrl;
    this._lastError = "";
  }

  data = (): T | Array<T> | undefined => this._data;
  lastError = (): string => this._lastError;

  _create = async (
    url: string,
    viewModel: T | undefined = undefined,
    token: string | undefined = undefined
  ): Promise<boolean> => {
    // Reset data and any errors
    this._data = undefined;
    this._lastError = "";

    // Setup request
    const requestInit: RequestInit = {
      method: "POST",
      referrerPolicy: "origin",
      credentials: token ? "include" : "omit",
    };

    try {
      // Add body and headers if request data was supplied
      if (viewModel) {
        requestInit.body = JSON.stringify(viewModel);
        requestInit.headers = new Headers({
          "Content-Type": "application/json",
        });
      }

      // Make the request
      const response = await fetch(url, requestInit);
      // Handle the response
      return await this._responseHandler(response);
    } catch (e) {
      console.debug(`exception: ${e.message}`);
      this.lastError = e.message;
    }
    return false;
  };

  _delete = async (url: string, token: string | undefined = undefined): Promise<boolean> => {
    // Reset data and any errors
    this._data = undefined;
    this._lastError = "";

    // Setup request
    const requestInit: RequestInit = {
      method: "DELETE",
      referrerPolicy: "origin",
      credentials: token ? "include" : "omit",
    };

    try {
      // Make the request
      const response = await fetch(url, requestInit);
      // Handle the response
      return await this._responseHandler(response);
    } catch (e) {
      console.debug(`exception: ${e.message}`);
      this.lastError = e.message;
    }
    return false;
  };

  _read = async (url: string, token: string | undefined = undefined): Promise<boolean> => {
    // Reset data and any errors
    this._data = undefined;
    this._lastError = "";

    // Setup request
    const requestInit: RequestInit = {
      method: "GET",
      referrerPolicy: "origin",
      credentials: token ? "include" : "omit",
    };

    try {
      // Make the request
      const response = await fetch(url, requestInit);
      // Handle the response
      return await this._responseHandler(response);
    } catch (e) {
      console.debug(`exception: ${e.message}`);
      this.lastError = e.message;
    }
    return false;
  };

  _update = async (
    url: string,
    viewModel: T | undefined = undefined,
    token: string | undefined = undefined
  ): Promise<boolean> => {
    // Reset data and any errors
    this._data = undefined;
    this._lastError = "";

    // Setup request
    const requestInit: RequestInit = {
      method: "PUT",
      referrerPolicy: "origin",
      credentials: token ? "include" : "omit",
    };

    try {
      // Add body and headers if request data was supplied
      if (viewModel) {
        requestInit.body = JSON.stringify(viewModel);
        requestInit.headers = new Headers({
          "Content-Type": "application/json",
        });
      }

      // Make the request
      const response = await fetch(url, requestInit);
      // Handle the response
      return await this._responseHandler(response);
    } catch (e) {
      console.debug(`exception: ${e.message}`);
      this.lastError = e.message;
    }
    return false;
  };

  _responseHandler = async (response: Response): Promise<boolean> => {
    // Check if the request was successful
    if ([200, 201, 204].includes(response.status)) {
      // Check if the response status indicates it includes data
      if ([200, 201].includes(response.status)) {
        // Set the returned data
        this._data = await response.json();
      }
      return true;
    } else {
      // Set the last error message
      this._lastError = response.statusText;
      console.debug(`error: ${this._lastError}`);
    }
    return false;
  };
}

export abstract class FullAPI<T extends BaseViewModel> extends BaseAPI<T> implements FullAPIType<T> {
  create(viewModel: T, token: string | undefined = undefined): Promise<boolean> {
    return this._create(this._baseUrl, viewModel, token);
  }

  delete(id: string | T, token: string | undefined = undefined): Promise<boolean> {
    return this._delete(`${this._baseUrl}/${id}`, token);
  }

  abstract deleteViewModel(viewModel: T, token: string | undefined): Promise<boolean>;

  read(id: string, token: string | undefined = undefined): Promise<boolean> {
    return this._read(`${this._baseUrl}/${id}`, token);
  }

  readAll(token: string | undefined = undefined): Promise<boolean> {
    return this._read(this._baseUrl, token);
  }

  update(id: string, viewModel: T, token: string | undefined = undefined): Promise<boolean> {
    return this._update(this._baseUrl, viewModel, token);
  }

  abstract updateViewModel(viewModel: T, token: string | undefined): Promise<boolean>;
}

export class CreateDeleteAPI<T extends BaseViewModel> extends BaseAPI<T> implements CreateDeleteAPIType<T> {
  create(viewModel: T, token: string | undefined = undefined): Promise<boolean> {
    return this._create(`${this._baseUrl}/create`, viewModel, token);
  }

  delete(viewModel: T, token: string | undefined = undefined): Promise<boolean> {
    return this._create(`${this._baseUrl}/delete`, viewModel, token);
  }

  read(id: string, token: string | undefined = undefined): Promise<boolean> {
    return this._read(`${this._baseUrl}/${id}`, token);
  }

  readAll(token: string | undefined = undefined): Promise<boolean> {
    return this._read(this._baseUrl, token);
  }
}

export class ReadOnlyAPI<T extends BaseViewModel> extends BaseAPI<T> implements ReadOnlyAPIType<T> {
  read(id: string, token: string | undefined = undefined): Promise<boolean> {
    return this._read(`${this._baseUrl}/${id}`, token);
  }

  readAll(token: string | undefined = undefined): Promise<boolean> {
    return this._read(this._baseUrl, token);
  }
}
