import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    loading: false,
    modal: {
      open: false,
      action: '',
    },
    temporal_data: {},
  },
  reducers: {
    toggleModal: (state, action) => {
      state.modal = action.payload;
      if (!action.payload.temporal_data) return;
      state.temporal_data = action.payload.temporal_data;
    },
  },
});
export const { toggleModal } = appSlice.actions;

export default appSlice.reducer;
