export interface UpdateViewModel {
  readonly id: string;
  name: string;
  amount: number;
  currency: string;
  day: number;
  monthInterval: number;
  beginDate: string;
  endDate: string;
  account: string;
  transactionSchedule: string;
}
