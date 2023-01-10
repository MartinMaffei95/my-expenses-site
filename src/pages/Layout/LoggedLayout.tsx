import { KeyboardEvent, MouseEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router';
import NavBar from '../../components/LayOut/Container/NavBar';
import ActionCreateButton from '../../components/LayOut/Pure/ActionCreateButton';
import LeftMenu from '../../components/LayOut/Pure/LeftMenu';
import BasicModal from '../../components/LayOut/Pure/ModalComponent';
import { useReloadData } from '../../hooks/useReloadData';
import { AppState, ReduxState } from '../../Interfaces/Redux.interface';
import { toggleModal } from '../../redux/appSlice';

type Props = {
  children?: JSX.Element | undefined;
};

export const LoggedLayout = ({ children }: Props) => {
  const [state, setState] = useState(false);
  //Transaction modal
  const [open, setOpen] = useState<boolean>(false);

  const loc = useLocation();
  const routes = ['account', 'transaction', 'categories'];
  const includesSome = routes.some((r) => loc.pathname.includes(r));
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
      <BasicModal />
      {!includesSome ? <ActionCreateButton /> : null}
      <div>{children}</div>
    </>
  );
};
