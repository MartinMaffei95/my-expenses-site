import { KeyboardEvent, MouseEvent, useEffect, useState } from 'react';
import NavBar from '../../components/Container/NavBar';
import LeftMenu from '../../components/Pure/LeftMenu';
import { useReloadData } from '../../hooks/useReloadData';

type Props = {
  children?: JSX.Element | undefined;
};

export const LoggedLayout = ({ children }: Props) => {
  const [state, setState] = useState(false);

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
  return (
    <>
      <NavBar toggleDrawer={toggleDrawer} />
      <LeftMenu toggleDrawer={toggleDrawer} state={state} />

      {children}
    </>
  );
};
