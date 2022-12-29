import { KeyboardEvent, MouseEvent, useEffect, useState } from 'react';
import NavBar from '../../components/Container/NavBar';
import ActionCreateButton from '../../components/Pure/ActionCreateButton';
import LeftMenu from '../../components/Pure/LeftMenu';
import BasicModal from '../../components/Pure/ModalComponent';
import { useReloadData } from '../../hooks/useReloadData';

type Props = {
  children?: JSX.Element | undefined;
};

export const LoggedLayout = ({ children }: Props) => {
  const [state, setState] = useState(false);
  //Transaction modal
  const [open, setOpen] = useState<boolean>(false);

  const reloadData = useReloadData();

  useEffect(() => {
    reloadData();
  }, []);

  const toggleDrawer =
    (open: boolean) => (event: KeyboardEvent | MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as KeyboardEvent).key === 'Tab' ||
          (event as KeyboardEvent).key === 'Shift')
      ) {
        return;
      }
      setState(open);
    };

  const toggleOpenTransaction =
    (open: boolean) => (event: KeyboardEvent | MouseEvent) => {
      console.log('is OPEEEEN:', open);
      setOpen(open);
      if (
        event.type === 'keydown' &&
        ((event as KeyboardEvent).key === 'Tab' ||
          (event as KeyboardEvent).key === 'Shift')
      ) {
        return setState(open);
      }
    };

  const handleclose = () => setOpen(false);
  return (
    <>
      <NavBar toggleDrawer={toggleDrawer} />
      <LeftMenu toggleDrawer={toggleDrawer} state={state} />
      <BasicModal
        open={open}
        toggleOpenTransaction={toggleOpenTransaction}
        handleclose={handleclose}
      />

      <ActionCreateButton toggleOpenTransaction={toggleOpenTransaction} />
      {children}
    </>
  );
};
