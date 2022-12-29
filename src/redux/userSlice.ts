import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {},
  },
  reducers: {
    updateUserData: (state, action) => {
      // const userData ={_id,name,username}
      state.user = action.payload;
    },
  },
});
export const { updateUserData } = userSlice.actions;

export default userSlice.reducer;
