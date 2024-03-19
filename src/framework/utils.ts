import { MonthlyStatus } from "./types";

export const statusColors = ['red', 'yellow', 'green'];

export const getMonthColor = (monthlyStatuses: MonthlyStatus[], month: number, year: number): string => {
    const monthStatus: MonthlyStatus | undefined = monthlyStatuses.find((monthlyStatus: MonthlyStatus) => {
      return monthlyStatus.year === year && monthlyStatus.month === month;
    });
    if (undefined !== monthStatus) {
      return statusColors[monthStatus.status];
    }
    return 'green';
};

export const getDates = (monthlyStatuses: MonthlyStatus[] | undefined): string[][] | undefined => {
    const pages: string[][] = [];
    if (undefined === monthlyStatuses) {
      return undefined;
    }
  
    const [month, year, endMonth, endYear] = getDateRanges(monthlyStatuses);
    let monthRunner = month;
    let yearRunner = year;

    while (dateBeforeEnd(monthRunner, yearRunner, endMonth, endYear)) {
      pages.push([(monthRunner < 10 ? '0' + monthRunner.toString() : monthRunner) + '/' + yearRunner, getMonthColor(monthlyStatuses, monthRunner, yearRunner)]);
      if (monthRunner === 12) {
        yearRunner++;
        monthRunner = 1;
      } else {
        monthRunner += 1;
      }
    }
    return pages;
  };

const dateBeforeEnd = (month: number, year: number, endMonth: number, endYear: number): boolean => {
    return new Date(year, month) <= new Date(endYear, endMonth);
};

const getDateRanges = (monthlyStatuses: MonthlyStatus[]): number[] => {
    const currDate = new Date();
    let startMonth: number = currDate.getMonth() + 1;
    let startYear: number = currDate.getFullYear();
    monthlyStatuses.forEach((monthlyStatus) => {
        const currDate = new Date(monthlyStatus.year, monthlyStatus.month);
        if (currDate < new Date(startYear, startMonth)) {
            startMonth = monthlyStatus.month;
            startYear = monthlyStatus.year;
        }
        });
    return [startMonth, startYear, currDate.getMonth() + 1, currDate.getFullYear()];
};

export const dateFormatter = (date:Date):string => {
  const prefixMonth = date.getMonth() < 10 ? '0' : '';
  const prefixDay = date.getDate() < 10 ? '0' : '';
  const year = date.getFullYear();
  const month = prefixMonth + (date.getMonth() + 1);
  const day = prefixDay + date.getDate();

  return day + '/' + month + '/' + year;
}

export const formatMonthYear = (month: number, year: number): string => {
  return month < 10 ? '0' + month.toString() + '/' + year.toString() : month.toString() + '/' + year.toString();
};