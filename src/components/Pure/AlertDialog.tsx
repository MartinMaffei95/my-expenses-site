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
        console.log(err.message);
        notificateToast('ERROR', 'Hubo un error! :(');
      } else {
        console.log('Unexpected error', err);
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
          {'Desea eliminar esta transaccion?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Estas seguro que deseas eliminar la transaccion :
            <p>Nro: {transaction?._id}</p>
            <p>
              Valor: {transaction?.type} {transaction?.value}{' '}
              {transaction?.account?.currency}
            </p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              toggleAlert(false);
            }}
            autoFocus
          >
            Disagree
          </Button>
          <Button onClick={removeTransaction}>Agree</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
