import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ChartFilter } from '../components/Charts/TransactionCharts';
import { ReduxState } from '../Interfaces/Redux.interface';
import { Transaction } from '../Interfaces/Transaction.interface';
import { randomColor } from '../utils/randomColor';
import { useChartFilter } from './useChartFilter';

type useChartProps = {
  transactions: Transaction[];
  filter: ChartFilter;
};
export const useChart = ({ filter, transactions }: useChartProps) => {
  const [tsxData, setTsxData] = useState() as any;
  //example
  //   {
  //     labels: ['Ingresos', 'Gastos'],
  //     datasets: [
  //       {
  //         data: transactionsProcessed.map((ts) => ts.value),
  //         backgroundColor: ['#15803d', '#b91c1c'],
  //       },
  //     ],
  //   }

  // fiterByCategoryAndType
  const { fiterByType, fiterByCategoryAndType, filterByDate, filterDayByDay } =
    useChartFilter();

  let arr;
  let obj;
  let filteredTransactions: Transaction[];
  useEffect(() => {
    if (filter.filterType === 'THIS_MONTH') {
      filteredTransactions = filterByDate(
        transactions,
        filter.initDate,
        undefined,
        'month'
      );
    } else if (filter.filterType === 'BET_DATES') {
      filteredTransactions = filterByDate(
        transactions,
        filter.initDate,
        filter.endDate,
        'days'
      );
    } else if (filter.filterType === 'DAY_X') {
      filteredTransactions = filterByDate(transactions, filter.initDate);
    } else if (filter.filterType === 'ALL') {
      filteredTransactions = transactions;
    }
    switch (filter.typeOfChart) {
      case 'EvI':
        if (filter.barChart) {
          arr = filterDayByDay(filteredTransactions);
          obj = {
            labels: arr?.map((d) => d.transaction_date),
            datasets: [
              {
                label: 'Ingresos',
                data: arr.map((ts) => ts.addition),
                backgroundColor: ['#15803d'],
              },
              {
                label: 'Egresos',
                data: arr.map((ts) => ts.substraction),
                backgroundColor: ['#b91c1c'],
              },
            ],
          };
          setTsxData(obj);
          console.log(obj);
          break;
        } else {
          arr = fiterByType(filteredTransactions);
          obj = {
            labels: ['Ingresos', 'Gastos'],
            datasets: [
              {
                data: arr.map((ts) => ts.value),
                backgroundColor: ['#15803d', '#b91c1c', '#d9221c'],
              },
            ],
          };
          setTsxData(obj);
          break;
        }

      case 'ExC':
        arr = fiterByCategoryAndType(filteredTransactions, 'SUBSTRACTION');
        obj = {
          labels: arr.map((ts) => ts.name),
          datasets: [
            {
              data: arr.map((ts) => ts.value),
              backgroundColor: arr.map((ts) => randomColor()),
            },
          ],
        };
        setTsxData(obj);
        break;
      case 'IxC':
        arr = fiterByCategoryAndType(filteredTransactions, 'ADDITION');
        obj = {
          labels: arr.map((ts) => ts.name),
          datasets: [
            {
              data: arr.map((ts) => ts.value),
              backgroundColor: arr.map((ts) => randomColor()),
            },
          ],
        };
        setTsxData(obj);
        break;

      default:
        break;
    }
  }, [filter]);
  return tsxData;
};
