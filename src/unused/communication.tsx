// import dayjs, { Dayjs } from "dayjs";
// import { dateFormatter } from "../framework/dateFormat.ts";
// import axios, { } from "axios";
// import { serverUrl } from "../framework/environment.ts";

// const allTransactions:Object[] = [];

// export enum TableHeaders {
//     ID = 0,
//     TransNum = 1,
//     Amount = 2,
//     Currency = 3,
//     Description = 4,
//     Status = 5,
//     Date = 6
// }

// export const filterTransactions = (startDate:Dayjs | null, endDate:Dayjs | null) => {
//     return allTransactions.filter((transaction) => { return true; /*TODO*/ })
// }

// export const getTransactionsFromServer = async () : Promise<boolean> => {

//     const begin = dayjs().toDate();
//     begin.setHours(0,0,0,0);

//     const end = dayjs().toDate();
//     end.setHours(0,0,0,0);
//     end.setDate(end.getDate() + 1);
//     end.setSeconds(end.getSeconds() - 1);

//     const transactionsResponse = axios.get(serverUrl);

//     if (200 !== (await transactionsResponse).status) {
//         return false;
//     }
    
//     const data = (await transactionsResponse).data;

//     data.forEach((transaction) => {
//         transaction['TransactionDate'] = dateFormatter(new Date(transaction['TransactionDate']));
//         allTransactions.push(
//             Object.keys(transaction).map((key) => {
//                 return transaction[key].toString()
//             })
//         )});
//     return true;
// }

// export const setTransactionStatus = async (transaction:Object) => {
//     const numPossibleStatuses = 3;
//     const data = {
//         TransNum: transaction[TableHeaders.TransNum],
//         Status: ((transaction[TableHeaders.Status] + 1) % numPossibleStatuses),
//         Description: (transaction[TableHeaders.Description]),
//         Amount: transaction[TableHeaders.Amount],
//         Currency: (transaction[TableHeaders.Currency]),
//         TransactionDate: new Date(transaction[TableHeaders.Date]),
//     }
//     return (await axios.put(serverUrl, data));
// }


   