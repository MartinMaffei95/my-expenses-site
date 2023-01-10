import * as React from 'react';
import { Box, Button, Typography, Modal } from '@mui/material';
import NewTransactionsContainer from '../../Transactions/Container/NewTransactionsContainer';
import CreateTransaction from '../../Transactions/Pure/CreateTransaction';
import { Dispatch } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { ReduxState } from '../../../Interfaces/Redux.interface';
import { useModal } from '../../../hooks/useModal';
import { CreateCategory } from '../../Category/Container/CreateCategory';
import { EditCategory } from '../../Category/Container/EditCategory';

export type ModalProps = {
  action?: string;
  actionFx: Dispatch;
};

export default function BasicModal() {
  const { modal } = useSelector((state: ReduxState) => state.app);
  const { handleModal } = useModal();

  return (
    <div>
      <Modal
        open={modal.open}
        onClose={() => handleModal(false, '')}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="fixed h-screen w-screen top-0 left-0 p-4"
      >
        <Box className="bg-neutral-100 p-4 overflow-x-scroll rounded-sm w-full h-full">
          {modal.action === 'EDIT' ? (
            <div>aaaa</div>
          ) : modal.action === 'CREATE_TRANSACTION' ? (
            <>
              <button
                onClick={() => handleModal(false, '')}
                className="absolute right-0 mr-6 top-0 mt-3"
              >
                X
              </button>

              <CreateTransaction />
            </>
          ) : modal.action === 'CREATE_CATEGORY' ? (
            <>
              <button
                onClick={() => handleModal(false, '')}
                className="absolute right-0 mr-6 top-0 mt-3"
              >
                X
              </button>

              <CreateCategory />
            </>
          ) : modal.action === 'EDIT_CATEGORY' ? (
            <>
              <button
                onClick={() => handleModal(false, '')}
                className="absolute right-0 mr-6 top-0 mt-3"
              >
                X
              </button>

              <EditCategory />
            </>
          ) : null}
          {/* <EditTransaction toggleOpenTransaction={toggleOpenTransaction} /> */}
        </Box>
      </Modal>
    </div>
  );
}
