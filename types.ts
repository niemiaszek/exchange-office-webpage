export type Currency = {
    representation: string;
    name: string;
    buy: number;
    sell: number;
};
  
export type ExchangeTableData = {
currencies: Currency[];
date: string;
submitter: string;
};