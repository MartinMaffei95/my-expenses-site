import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import { GrAdd } from 'react-icons/gr';
import { ModalProps } from './ModalComponent';

export default function ActionCreateButton({
  toggleOpenTransaction,
}: ModalProps) {
  const fabStyle = {
    position: 'fixed',
    bottom: 16,
    right: 16,
  };

  return (
    <Box sx={fabStyle}>
      <Fab
        color="primary"
        aria-label="add"
        onClick={toggleOpenTransaction(true)}
      >
        <GrAdd />
      </Fab>
    </Box>
  );
}
