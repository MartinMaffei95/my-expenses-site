import { useSelector } from 'react-redux';
import { ReduxState } from '../Interfaces/Redux.interface';
import { Transaction } from '../Interfaces/Transaction.interface';
import * as dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import { normalizeDate } from '../utils/normalizeDate';

type useChartFilterProps = {
  transactions: Transaction[];
};
export const useChartFilter = () => {
  dayjs.extend(customParseFormat);
  dayjs.extend(isSameOrBefore);
  dayjs.extend(isSameOrAfter);

  const categories = useSelector(
    (state: ReduxState) => state.user.user.my_categories
  );
  const fiterByType = (transactions: Transaction[]) => {
    let additions = {
      value: 0,
    };
    let substractions = {
      value: 0,
    };

    for (let i = 0; i < transactions?.length; i++) {
      const transaction = transactions[i];
      if (transaction.type === 'ADDITION') {
        additions.value += transaction.value;
      } else if (transaction.type === 'SUBSTRACTION') {
        substractions.value += transaction.value;
      } else {
      }
    }

    return [additions, substractions];
  };

  const filterDayByDay = (transactions: Transaction[]) => {
    let dates = [] as any[];

    for (let i = 0; i < transactions?.length; i++) {
      const transaction = transactions[i];
      if (
        dates.some((d) => d.transaction_date === transaction.transaction_date)
      ) {
        const date = dates.find(
          (d) => d.transaction_date === transaction.transaction_date
        );
        if (transaction.type === 'SUBSTRACTION') {
          date.substraction += transaction.value;
        } else if (transaction.type === 'ADDITION') {
          date.addition += transaction.value;
        }
      } else {
        if (transaction.type === 'SUBSTRACTION') {
          dates.push({
            transaction_date: transaction.transaction_date,
            substraction: transaction.value,
            addition: 0,
          });
        } else if (transaction.type === 'ADDITION') {
          dates.push({
            transaction_date: transaction.transaction_date,
            substraction: 0,
            addition: transaction.value,
          });
        }
      }
    }

    return dates;
  };

  // filterByDate(transactions, '01/02/2023', '01/02/2023', 'months'); => By Month (month02 in this case)
  const filterByDate = (
    transactions: Transaction[],
    initDate: string,
    endDate?: string,
    dateFormatFilter: dayjs.OpUnitType = 'days'
  ) => {
    let processInitDate = normalizeDate(initDate);
    let processEndDate = endDate
      ? normalizeDate(endDate)
      : normalizeDate(initDate);

    let filteredTransactions = [];
    for (let i = 0; i < transactions.length; i++) {
      const transaction = transactions[i];

      if (
        (
          normalizeDate(transaction.transaction_date) as dayjs.Dayjs
        ).isSameOrAfter(processInitDate, dateFormatFilter) &&
        (
          normalizeDate(transaction.transaction_date) as dayjs.Dayjs
        ).isSameOrBefore(processEndDate, dateFormatFilter)
      ) {
        filteredTransactions.push(transaction);
      }
    }
    return filteredTransactions;
  };
  const fiterByCategoryAndType = (
    transactions: Transaction[],
    type: 'ADDITION' | 'SUBSTRACTION'
  ) => {
    let proccesTsx = [] as any[];

    for (let i = 0; i < transactions.length; i++) {
      const transaction = transactions[i];
      if (transaction.type === type) {
        if (proccesTsx.find((cat) => cat._id === transaction.category._id)) {
          proccesTsx.some((c) => {
            c._id === transaction.category._id;
            c.value += transaction.value;
          });
        } else {
          const newCategory = {
            _id: transaction.category._id,
            name: transaction.category.name,
            value: transaction.value,
          };
          proccesTsx.push(newCategory);
        }
      }
    }
    if (proccesTsx.length <= 0)
      return [
        {
          _id: '0',
          name: 'none',

        },
      ];
    return proccesTsx;
  };

  return { fiterByType, fiterByCategoryAndType, filterByDate, filterDayByDay };
  //   const transactionsProcessed = createData(transactions);
};
