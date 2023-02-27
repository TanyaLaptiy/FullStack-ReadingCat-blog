import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

import axios from 'axios';
import { ResponseAuthType } from '../../services/api/types';
import { HYDRATE } from 'next-redux-wrapper';
// export const fetchUser = createAsyncThunk('pies/fetchPie', async (id: number) => {
//   const { data } = await axios.get<ResponseAuthType[]>(
//     `https://63defbd13d94d02c0bb2ee5d.mockapi.io/pies?id=${id}`,
//   );
//   return data as ResponseAuthType[];
// });

// export const fetchPies = createAsyncThunk<{ data: ResponseAuthType[]}>(
//     'pies/fetchPies',
//     async (id) => {
//         const { data } = await axios.get<ResponseAuthType[]>(
//             `https://63defbd13d94d02c0bb2ee5d.mockapi.io/pies?id=${id}`,
//           );
//           return data ;
//     },
//   );

// enum status {
//   LOADING = 'loading',
//   LOADED = 'loaded',
//   ERROR = 'error',
// }

interface UserSliceState {
  data: ResponseAuthType;
}

const initialState: UserSliceState = {
  data: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<ResponseAuthType>) => {
      state.data = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      state.data = action.payload.user.data;
    },
  },
});
export const { setUserData } = userSlice.actions;
export const selectUser = (state: RootState) => state.user.data;
export default userSlice.reducer;
