import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Transaction } from '../../Interfaces/Transaction.interface';
import { deleteTransaction } from '../../services/Transaction.services';
import { useReloadData } from '../../hooks/useReloadData';

type AlertDialogProps = {
  transaction: Transaction | undefined;
  open: boolean;
  toggleAlert: Function;
  notificateToast: Function;
};

export default function AlertDialog({
  open,
  toggleAlert,
  transaction,
  notificateToast,
}: AlertDialogProps) {
  const reloadData = useReloadData();

  const removeTransaction = async () => {
    if (!transaction?._id) {
      notificateToast('ERROR', 'Hubo un error! :(');
    }
    try {
      await deleteTransaction(transaction?._id);
      notificateToast('SUCCESS', 'La transaccion se elimino con éxito!');
      reloadData();
      toggleAlert(false);
    } catch (err) {
      if (err instanceof Error) {
        notificateToast('ERROR', 'Hubo un error! :(');
      } else {
        notificateToast('ERROR', 'Hubo un error! :(');
      }
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={() => {
          toggleAlert(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <p className="subtitle">{'Desea eliminar esta transaccion?'}</p>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div className="label-style">
              Estas seguro que deseas eliminar la transaccion:
              <p>Categoria: {transaction?.category.name}</p>
              <p>
                Valor:{' '}
                <span
                  className={`${
                    transaction?.type === 'SUBSTRACTION'
                      ? 'text-red-500'
                      : transaction?.type === 'ADDITION' && 'text-green-600'
                  }`}
                >
                  {transaction?.type === 'SUBSTRACTION'
                    ? '-$'
                    : transaction?.type === 'ADDITION' && '$'}
                  {transaction?.value}
                </span>{' '}
                {transaction?.account?.currency}
              </p>
              <p className="text-sm text-right text-gray-500">
                {transaction?.created_by.username}{' '}
                {transaction?.transaction_date}
              </p>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              toggleAlert(false);
            }}
            autoFocus
          >
            Cancelar
          </Button>
          <Button color="error" onClick={removeTransaction}>
            Si, quiero eliminarla
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
