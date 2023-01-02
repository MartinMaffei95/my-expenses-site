import { createSlice } from '@reduxjs/toolkit';

export const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    appSettings: {},
  },
  reducers: {
    loadSettings: (state, action) => {
      state.appSettings = action.payload.appSettings;
    },
  },
});
export const { loadSettings } = settingsSlice.actions;

export default settingsSlice.reducer;
