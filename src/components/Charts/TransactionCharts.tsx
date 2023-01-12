import {
  ChangeEvent,
  DetailedHTMLProps,
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useSelector } from 'react-redux';
import { ReduxState } from '../../Interfaces/Redux.interface';
import { AccountDataContainerProps } from '../Accounts/Container/AccountDataContainer';
import { Transaction } from '../../Interfaces/Transaction.interface';

//CHART.JS
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from 'chart.js';
import { Bar, Doughnut, Pie } from 'react-chartjs-2';
import { useChartFilter } from '../../hooks/useChartFilter';
import { normalizeDate, normalizeDateOP } from '../../utils/normalizeDate';
import * as dayjs from 'dayjs';
import { useChart } from '../../hooks/useCharts';

export type ChartFilter = {
  filterType: string;
  initDate: string;
  endDate: string;
  typeOfChart: string;
  barChart: boolean;
};
export const TransactionCharts = ({ account }: AccountDataContainerProps) => {
  ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    Title
  );
  const [chartData, setChartData] = useState({});
  const [filter, setFilter] = useState<ChartFilter>({
    filterType: 'THIS_MONTH',
    initDate: normalizeDateOP(), // => HTML inputdate format
    endDate: normalizeDateOP(), // => HTML inputdate format
    typeOfChart: 'EvI',
    barChart: false,
  });

  const { transactions } = account;
  const checkRef = useRef<any>();
  const chartSettings = useChart({ transactions, filter });
  const handleFilter = (
    e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, type } = e.target;
    // console.log(name, value, type);
    // e.currentTarget;
    if (type === 'date') {
      setFilter((prevState) => ({
        ...prevState,
        [name]: normalizeDateOP(value),
      }));
    } else if (type === 'checkbox') {
      setFilter((prevState) => ({
        ...prevState,
        [name]: checkRef?.current?.checked || false,
      }));
    } else {
      setFilter((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };
  const options = {
    plugins: {
      title: {
        display: true,
        text: 'Chart.js Bar Chart - Stacked',
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };
  useEffect(() => {
    setChartData(chartSettings);
  }, [filter]);
  return (
    <div className="flex flex-col gap-8 w-full ">
      <div className="flex flex-col justify-between gap-2">
        <select
          name="filterType"
          value={filter.filterType}
          onChange={(e) => handleFilter(e)}
          className="border-black border-2 rounded p-2"
        >
          {/* <option value="EXPENSES_VS_INCOMES">Gastos Vs. Ingresos</option>{' '} */}
          <option value="ALL">Todo</option>
          <option value="THIS_MONTH">Este mes</option>
          <option value="BET_DATES">Entre fechas</option>
          <option value="DAY_X">Dia especifico</option>
        </select>
        {filter?.filterType === 'THIS_MONTH' ? (
          <input
            ref={checkRef}
            type="checkbox"
            name="barChart"
            checked={filter.barChart}
            onChange={(e) => handleFilter(e)}
          />
        ) : null}
        {filter?.filterType === 'BET_DATES' ? (
          <div className="flex justify-around">
            <input
              className="border-black border-2 rounded p-2"
              name="initDate"
              value={normalizeDateOP(
                filter.initDate,
                'DD/MM/YYYY',
                'YYYY-MM-DD'
              )}
              type="date"
              onChange={(e) => handleFilter(e)}
            />
            <input
              className="border-black border-2 rounded p-2"
              name="endDate"
              value={normalizeDateOP(
                filter.endDate,
                'DD/MM/YYYY',
                'YYYY-MM-DD'
              )}
              type="date"
              onChange={(e) => handleFilter(e)}
            />
          </div>
        ) : filter?.filterType === 'DAY_X' ? (
          <div className=" flex justify-center">
            <input
              className="border-black border-2 rounded p-2"
              name="initDate"
              value={normalizeDateOP(
                filter.initDate,
                'DD/MM/YYYY',
                'YYYY-MM-DD'
              )}
              type="date"
              onChange={(e) => handleFilter(e)}
            />
          </div>
        ) : null}
        <select
          className="border-black border-2 rounded p-2"
          name="typeOfChart"
          value={filter.typeOfChart}
          onChange={(e) => handleFilter(e)}
        >
          <option value="EvI">Gastos vs. Ingresos</option>
          <option value="IxC"> Ingresos por Categoria</option>
          <option value="ExC"> Egresos por Categoria</option>
        </select>
      </div>
      <div className="flex justify-center items-center w-screen h-96">
        {/* <Doughnut data={tsxData} />
        <Doughnut data={tsxDat} /> 
         <Bar data={chartSettings} />*/}
        {chartSettings && !filter.barChart ? (
          <Doughnut data={chartSettings} />
        ) : chartSettings && filter.barChart === true ? (
          <Bar data={chartSettings} options={options} />
        ) : null}
      </div>
    </div>
  );
};
