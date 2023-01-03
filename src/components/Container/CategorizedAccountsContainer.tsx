import {
  Collapse,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { IconType } from 'react-icons/lib';
import { MdExpandMore } from 'react-icons/md';
import { Account } from '../../Interfaces/Account.interface';
import { AccountItemMenu } from '../Pure/AccountItemMenu';
import { AccountsSectionMenuProps } from '../Pure/AccountsSectionMenu';

interface CategorizedAccountsContainerProps extends AccountsSectionMenuProps {
  accordionText: string;
  categoryIcon: JSX.Element | undefined;
}

const CategorizedAccountsContainer = ({
  accounts,
  accordionText,
  categoryIcon,
}: CategorizedAccountsContainerProps) => {
  const [allAccounts, setAllAccounts] = useState<Account[]>(accounts);

  const [open, setOpen] = useState<boolean>(false);
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItemButton onClick={handleClick}>
        {categoryIcon ? <ListItemIcon>{categoryIcon}</ListItemIcon> : null}

        <ListItemText primary={`${accordionText}`} />
        <ListItemIcon>
          <MdExpandMore
            className={`${open ? '' : 'rotate-90'} transition ease-in`}
          />
        </ListItemIcon>
      </ListItemButton>

      <Collapse className="border-b-4" in={open} timeout="auto" unmountOnExit>
        {!allAccounts
          ? null
          : allAccounts.map((cAcc) => <AccountItemMenu account={cAcc} />)}
      </Collapse>
    </>
  );
};
export default CategorizedAccountsContainer;
