import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useSelector } from 'react-redux';
import { AccountsState } from '../../Interfaces/Redux.interface';
import { mapApiToAccount } from '../../utils/mapApiToAccount';
import { Account } from '../../Interfaces/Account.interface';
import { AccountItemMenu } from './AccountItemMenu';

export type LeftMenuProps = {
  toggleDrawer: Function;
  state?: boolean;
};

export default function LeftMenu({ toggleDrawer, state }: LeftMenuProps) {
  const [accounts, setAccounts] = React.useState<Array<Account>>([]);

  const allAccounts = useSelector(
    (state: AccountsState) => state.accounts.accounts
  );

  React.useEffect(() => {
    if (allAccounts?.length <= 0) return;
    const trax = mapApiToAccount(allAccounts);
    setAccounts(trax);
  }, [allAccounts]);

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {/* Todo inster array of accounts */}
        {accounts.map((acc) => (
          <AccountItemMenu account={acc} />
        ))}
      </List>
      <Divider />
      <List>
        {/* Todo instert one account with total*/}
        {/* <AccountItemMenu account={TotalAccount} /> */}
      </List>
    </Box>
  );

  return (
    <div>
      <React.Fragment>
        {/* <Button onClick={toggleDrawer(true)}>OPEN</Button> */}
        <Drawer open={state} onClose={toggleDrawer(false)}>
          {list()}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
