import { Divider } from '@mui/material';

type AccountResumeProps = {
  initial_balance: number;
  total_expenses: number;
  total_income: number;
  balance: number;
};

const AccountResume = ({
  initial_balance,
  total_expenses,
  total_income,
  balance,
}: AccountResumeProps) => {
  type AccountResumeItemProps = {
    text: string;
    value: number;
    valueSx?: string;
  };
  const AccountResumeItem = ({
    text,
    value,
    valueSx,
  }: AccountResumeItemProps) => {
    return (
      <div className="flex justify-between">
        {text}:
        <span className={`${valueSx ? valueSx : ''}`}>{`${
          value >= 0 ? `$ ${value}` : `-$ ${value}`
        }`}</span>
      </div>
    );
  };

  return (
    <div className="flex-col divide-y divide-slate-400">
      <div className="flex-col pb-2">
        <AccountResumeItem text="Balance incial" value={initial_balance} />
        <AccountResumeItem
          text="Gastos"
          value={total_expenses}
          valueSx="text-red-600"
        />
        <AccountResumeItem
          text="Ingresos"
          value={total_income}
          valueSx="text-green-600"
        />
      </div>
      <div className="pt-1">
        <AccountResumeItem
          text="Balance total"
          value={balance}
          valueSx={balance > 0 ? 'text-green-600' : 'text-red-600'}
        />
      </div>
    </div>
  );
};
export default AccountResume;
