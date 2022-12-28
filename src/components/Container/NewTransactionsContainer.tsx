import CreateTransaction from '../Pure/CreateTransaction';
import { ModalProps } from '../Pure/ModalComponent';

const NewTransactionsContainer = ({
  open,
  toggleOpenTransaction,
}: ModalProps) => {
  return (
    <div>
      <CreateTransaction toggleOpenTransaction={toggleOpenTransaction} />
    </div>
  );
};
export default NewTransactionsContainer;
