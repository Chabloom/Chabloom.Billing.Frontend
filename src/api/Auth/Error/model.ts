import { BaseViewModel } from "../../model";

export interface ErrorViewModel extends BaseViewModel {
  readonly error: string;
  readonly errorDescription: string;
  readonly redirectUri: string;
}
