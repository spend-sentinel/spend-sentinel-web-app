// import { List } from '@mui/material';
// import React, { useEffect, useState } from 'react';
// import { FunctionComponent } from 'react';
// import { PaginationButton } from './monthButton.tsx';
// import { formatMonthYear } from './utils.ts';

// const getPagesNumbers = (currPage: number, numPages: number): number[] => {
//   if (currPage <= 3) {
//     return Array.from({ length: Math.min(5, numPages) }, (_, i) => i + 1);
//   } else if (currPage >= numPages - 2) {
//     return Array.from({ length: Math.min(5, numPages) }, (_, i) => numPages - 4 + i);
//   } else {
//     return Array.from({ length: Math.min(5, numPages) }, (_, i) => currPage - 2 + i);
//   }
// };

// const getPages = (currPage: number, numPages: number, onClick: (page: number) => void, onPageChange: (date: string) => void) => {
//   const indexes = getPagesNumbers(currPage, numPages);
//   return (
//     <div>
//       {indexes.map((value: number) => {
//         const date = new Date();
//         date.setMonth(date.getMonth() - value + 1);
//         const month = date.getMonth() + 1;
//         const year = date.getFullYear();
//         return (
//           <PaginationButton
//             key={value}
//             currPage={currPage}
//             month={month}
//             year={year}
//             pageNumber={value}
//             onclick={() => {
//               onPageChange(formatMonthYear(month, year));
//               onClick(value);
//             }}
//           />
//         );
//       })}
//     </div>
//   );
// };

// const GetNumMonths = async (setStartAndEndDates: (endMonth: number, endYear: number, numMonths: number) => void): Promise<number> => {
//   // TODO - backend needs to have route that returns first transaction date
//   const start = { month: 1, year: 2023 };
//   const now = { month: new Date().getMonth() + 1, year: new Date().getFullYear() };
//   const numMonths = (now.year - start.year) * 12 - start.month + now.month + 1;
//   setStartAndEndDates(now.month, now.year, numMonths);
//   return numMonths <= 0 ? 0 : numMonths;
// };

// interface Props {
//   onPageChange: (date: string) => void;
// }

// export const MonthlyPagination: FunctionComponent<Props> = ({ onPageChange }) => {
//   const [numPages, setNumPages] = useState(0);
//   const [currPage, setCurrPage] = useState(0);
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');

//   useEffect(() => {
//     const getNumMonths = async () => {
//       const numMonths = await GetNumMonths((endMonth: number, endYear: number, numMonths: number) => {
//         setEndDate(formatMonthYear(endMonth, endYear));
//         const startDate = new Date(endYear, endMonth - 1);
//         startDate.setMonth(startDate.getMonth() - numMonths - 1);
//         setStartDate(formatMonthYear(startDate.getMonth() + 1, startDate.getFullYear()));
//       });
//       setNumPages(numMonths);
//       setCurrPage(1);
//     };
//     getNumMonths();
//   }, []);

//   return (
//     <List style={{ display: 'flex', flexDirection: 'row-reverse' }}>
//       <PaginationButton
//         currPage={currPage}
//         month={0}
//         year={1}
//         pageNumber={undefined}
//         text='>>'
//         onclick={() => {
//           setCurrPage(Math.min(currPage + 1, numPages));
//           onPageChange(startDate);
//         }}
//       />
//       {getPages(currPage, numPages, setCurrPage, onPageChange)}
//       <PaginationButton
//         currPage={currPage}
//         month={0}
//         year={0}
//         pageNumber={undefined}
//         text='<<'
//         onclick={() => {
//           setCurrPage(Math.max(currPage - 1, 1));
//           onPageChange(endDate);
//         }}
//       />
//     </List>
//   );
// };
