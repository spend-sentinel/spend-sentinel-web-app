import axios from "axios";
import { serverUrl } from "./environment.ts"
import { useQuery } from "react-query";
import React from "react";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { NColorsButton } from "./NColorsButton.tsx";
import { dateFormatter } from "./dateFormat.ts";
import dayjs, { Dayjs } from "dayjs";

const GetTransactions = async () => {
    const response = await axios.get(serverUrl);
    return response.data;
}

const updateTransaction = async (transaction):Promise<boolean> => {
    transaction.Status = (transaction.Status + 1) % 3;
    return ((await axios.put(serverUrl, transaction)).status === 200);
}

const DisplayTransactions = (startDate:Dayjs, endDate:Dayjs, showTable:boolean) => {
    const {data:transactions, error, isLoading} = useQuery("transactionsData", GetTransactions);
    if (isLoading) return (<div>Fetching Data...</div>);
    if (error) return (<div>An error occurred</div>);

    const filteredData = transactions.filter((transaction) => {
        const transactionDate = dayjs(transaction.TransactionDate.toString())
        return (transactionDate.isBefore(endDate) && transactionDate.isAfter(startDate));
    })

    if (!showTable) return <div></div>

    if (0 === filteredData.length) return (<h1>No transactions between chosen dates</h1>);

    return (
        <div>
            <TableContainer component={Paper}>
                <Table sx={{minWidth:650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow sx={{ border: 3}}>
                            <TableCell sx={{ border: 3}} align="center">Status</TableCell>
                            <TableCell sx={{ border: 3}} align="center">Description</TableCell>
                            <TableCell sx={{ border: 3}} align="center">Amount</TableCell>
                            <TableCell sx={{ border: 3}} align="center">Currency</TableCell>
                            <TableCell sx={{ border: 3}} align="center">Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredData.map((row:any, index:number) => (
                            <TableRow key={index} sx={{ border: 3}}>
                                <TableCell sx={{ border: 1}} align="center">
                                <NColorsButton
                                    onClick={ updateTransaction }
                                    colors={['yellow','green','red']}
                                    initialColorNumber={row.Status}
                                    transaction={row}>
                                </NColorsButton>
                                </TableCell>
                                <TableCell sx={{ border: 3}} align="center">{row.Description}</TableCell>
                                <TableCell sx={{ border: 3}} align="center">{row.Amount}</TableCell>
                                <TableCell sx={{ border: 3}} align="center">{row.Currency}</TableCell>
                                <TableCell sx={{ border: 3}} align="center">{dateFormatter(new Date(row.TransactionDate.toString()))}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
       );
}

export default DisplayTransactions;