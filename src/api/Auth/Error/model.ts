import { BaseViewModel } from "../../../common";

export interface ErrorViewModel extends BaseViewModel {
  readonly error: string;
  readonly description: number;
  readonly redirectUri: string;
}
