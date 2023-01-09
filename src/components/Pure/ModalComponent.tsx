import * as React from 'react';
import { Box, Button, Typography, Modal } from '@mui/material';
import NewTransactionsContainer from '../Container/NewTransactionsContainer';
import CreateTransaction from './CreateTransaction';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  color: '#000',
};

export type ModalProps = {
  open?: boolean;
  toggleOpenTransaction: Function;
  handleclose?: Function | undefined;
  action?: 'EDIT' | 'CREATE';
};

export default function BasicModal({
  open,
  toggleOpenTransaction,
  handleclose,

  action = 'CREATE',
}: ModalProps) {
  return (
    <div>
      <Modal
        open={open ? open : false}
        onClose={toggleOpenTransaction(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {action === 'EDIT' ? (
            <div>aaaa</div>
          ) : action === 'CREATE' ? (
            <>
              <button
                onClick={() => handleclose && handleclose()}
                className="absolute right-0 mr-6 top-0 mt-3"
              >
                X
              </button>

              <CreateTransaction
                toggleOpenTransaction={toggleOpenTransaction}
                handleclose={handleclose}
              />
            </>
          ) : null}
          {/* <EditTransaction toggleOpenTransaction={toggleOpenTransaction} /> */}
        </Box>
      </Modal>
    </div>
  );
}
