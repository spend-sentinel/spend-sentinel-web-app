export type MonthlyStatus = {
    year: number;
    month: number;
    status: number;
};

export enum DateAndColor {
    DATE = 0,
    COLOR = 1
}

export type MoneyTransaction = {
    TransNum: string;
    Status: number;
    Amount: number;
    Currency: string;
    TransactionDate: string;
    Description: string;
  };
  