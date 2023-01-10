import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    loading: false,
    modal: {
      open: false,
      action: '',
    },
  },
  reducers: {
    toggleModal: (state, action) => {
      state.modal = action.payload;
    },
  },
});
export const { toggleModal } = appSlice.actions;

export default appSlice.reducer;
