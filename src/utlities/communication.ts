import { Dayjs } from "dayjs";
import { dateFormatter } from "./dateFormat.ts";

export const getTransactionsFromServer = (startDate:Dayjs | null, endDate:Dayjs | null): Object[] => {
    if (!startDate || !endDate) {
        return [];
    }

    const begin = startDate.toDate();
    begin.setHours(0,0,0,0);

    const end = endDate.toDate();
    end.setHours(0,0,0,0);
    end.setDate(end.getDate() + 1);
    end.setSeconds(end.getSeconds() - 1);

    const transactionsDict = [{
        "TransNum": '123',
        "Status": 1,
        "Amount": 350,
        "Description": "Hello there",
        "TransactionDate": new Date().toString(),
        "Currency": "USD"
      },
      {
        "TransNum": '123',
        "Status": 0,
        "Amount": 50,
        "Description": "Shawarma",
        "TransactionDate": new Date().toString(),
        "Currency": "NIS"
      },
      {
        "TransNum": '123',
        "Status": 2,
        "Amount": 350,
        "Description": "Falafel",
        "TransactionDate": new Date().toString(),
        "Currency": "NIS"
      }
    ];
    
    const transactionsData:Object[] = [];
    transactionsDict.forEach((transaction) => {
        transaction['TransactionDate'] = dateFormatter(new Date(transaction['TransactionDate']));
        transactionsData.push(
            Object.keys(transaction).map((key) => {
                return transaction[key].toString()
            })
        )});
        
    return transactionsData
}

export const setTransactionStatus = (transaction:any):boolean => {
    return false;
}