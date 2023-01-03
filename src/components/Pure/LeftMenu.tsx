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
import AccountAdminPanel from './AccountAdminPanel';
import { Collapse } from '@mui/material';
import { MdExpandMore, MdOutlineList } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import AccountsSectionMenu from './AccountsSectionMenu';
import { BiHomeAlt } from 'react-icons/bi';

export type LeftMenuProps = {
  toggleDrawer: Function;
  state?: boolean;
};

export default function LeftMenu({ toggleDrawer, state }: LeftMenuProps) {
  const [accounts, setAccounts] = React.useState<Array<Account>>([]);
  const [open, setOpen] = React.useState(false);
  console.log(accounts);
  const handleClick = () => {
    setOpen(!open);
  };
  const allAccounts = useSelector(
    (state: AccountsState) => state.accounts.accounts
  );

  const navigate = useNavigate();

  const toPage = (url: string) => {
    navigate(`${url}`);
    toggleDrawer(false);
  };

  React.useEffect(() => {
    if (allAccounts?.length <= 0) return;
    const trax = mapApiToAccount(allAccounts);
    setAccounts(trax);
  }, [allAccounts]);

  const list = () => (
    <Box
      sx={{ width: 300 }}
      className="overflow-y-auto"
      role="presentation"
      // onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => toPage('/')}>
            <ListItemIcon>
              <BiHomeAlt />
            </ListItemIcon>
            <ListItemText primary="Inicio" />
          </ListItemButton>
        </ListItem>
        {/* Account admin panel */}
        <ListItemButton onClick={handleClick}>
          <ListItemIcon>
            <MdExpandMore />
          </ListItemIcon>
          <ListItemText primary="Administrar cuentas" />
        </ListItemButton>

        <Collapse className="border-b-4" in={open} timeout="auto" unmountOnExit>
          <AccountAdminPanel redirectFx={toPage} />
        </Collapse>

        {accounts ? <AccountsSectionMenu accounts={accounts} /> : null}
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
