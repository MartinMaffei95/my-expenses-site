import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { AccountProps } from './SingleAccount';
import { Box } from '@mui/system';

export const AccountItemMenu = ({ account }: AccountProps) => {
  return (
    <ListItem disablePadding>
      <ListItemButton>
        <div className="border">
          {/* use color for item background  */}
          <p>{account.color}</p>
          <p>{account.name}</p>
          <div>
            {account.currency} - {account.type}
          </div>
          <p style={{ color: `${account?.balance > 0 ? 'green' : 'red'}` }}>
            {`${
              account?.balance > 0
                ? `$ ${account?.balance}`
                : `-$ ${account?.balance}`
            }`}
          </p>
        </div>
      </ListItemButton>
    </ListItem>
  );
};
