import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { AccountProps } from './SingleAccount';
import ColorCircle from '../Molecules/ColorCircle/ColorCircle';
import AccountResume from '../Molecules/AccountResume';

export const AccountItemMenu = ({ account }: AccountProps) => {
  return (
    <ListItem disablePadding>
      <ListItemButton>
        <div className="w-full">
          {/* use color for item background  */}
          <div className="flex justify-start items-end gap-2">
            <ColorCircle isConfig={false} color={account.color} />
            <p>{account.name}</p>
          </div>

          <div>
            {account.currency} - {account.type}
          </div>
          {/* account resume */}
          <AccountResume
            initial_balance={account.initial_balance}
            total_expenses={account.total_expenses}
            total_income={account.total_income}
            balance={account.balance}
          />
        </div>
      </ListItemButton>
    </ListItem>
  );
};
