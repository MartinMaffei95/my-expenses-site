import CreateTransaction from '../Pure/CreateTransaction';
import { ModalProps } from '../Pure/ModalComponent';

const NewTransactionsContainer = ({ open, handleClose }: ModalProps) => {
  return (
    <div>
      <CreateTransaction handleClose={handleClose} />
    </div>
  );
};
export default NewTransactionsContainer;
