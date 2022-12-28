import * as React from 'react';
import { Box, Button, Typography, Modal } from '@mui/material';
import NewTransactionsContainer from '../Container/NewTransactionsContainer';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  color: '#000',
};

export type ModalProps = {
  open?: boolean;
  handleClose: Function;
};

export default function BasicModal({ open, handleClose }: ModalProps) {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <NewTransactionsContainer handleClose={handleClose} />
        </Box>
      </Modal>
    </div>
  );
}
