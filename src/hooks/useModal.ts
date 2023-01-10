import { useDispatch } from 'react-redux';
import { toggleModal } from '../redux/appSlice';

export const useModal = () => {
  const dispatch = useDispatch();

  const handleModal = (open: boolean, action: string, temporal_data?: any) => {
    dispatch(toggleModal({ open: open, action: action, temporal_data }));
  };

  return { handleModal };
};
