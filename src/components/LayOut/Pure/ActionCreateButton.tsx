import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import { GrAdd } from 'react-icons/gr';
import { ModalProps } from './ModalComponent';
import { useModal } from '../../../hooks/useModal';

export default function ActionCreateButton() {
  const fabStyle = {
    position: 'fixed',
    zIndex: 1000,
    bottom: 16,
    right: 16,
  };
  const { handleModal } = useModal();
  return (
    <Box sx={fabStyle} onClick={() => handleModal(true, 'CREATE_TRANSACTION')}>
      <Fab color="primary" aria-label="add">
        <GrAdd />
      </Fab>
    </Box>
  );
}
