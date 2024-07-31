import {
  createAsyncThunk,
  createSlice,
  GetThunkAPI,
  PayloadAction,
} from '@reduxjs/toolkit';

import { RootState } from '@/app/store.ts';
import { deleteChatLocal, fetchChatsFromLocal } from '@/utils/api.ts';

type AsyncThunkConfig = {
  state?: unknown;
  extra?: unknown;
  rejectValue?: unknown;
  serializedErrorType?: unknown;
  pendingMeta?: unknown;
  fulfilledMeta?: unknown;
  rejectedMeta?: unknown;
};

type ChatCardType = {
  Name: string;
  Description: string;
  Image: string;
  Price: number;
  Id: string;
};

type InitialState = {
  chats: ChatCardType[];
  error: null | Error;
  isLoading: boolean;
  page: number;
  perPage: number;
  totalPages: number;
};

const initialState: InitialState = {
  chats: [],
  error: null,
  isLoading: true,
  page: 1,
  perPage: 4,
  totalPages: 1,
};

async function fetchChats(
  _: void,
  { rejectWithValue, dispatch, getState }: GetThunkAPI<AsyncThunkConfig>,
): Promise<ChatCardType[]> {
  const { perPage, page } = (getState() as RootState).chats;

  try {
    const response = await fetchChatsFromLocal(page, perPage);

    dispatch(setTotalPage(Math.ceil(response['x-total-count'] / perPage)));

    return response.chats;
  } catch (e) {
    rejectWithValue(e);

    return [];
  }
}

export const fetchChatsThunk = createAsyncThunk('chats/fetchChatsThunk', fetchChats);
export const updateChats = createAsyncThunk('chats/updateChats', fetchChats);

export const deleteChat = createAsyncThunk(
  'chats/deleteChat',
  async function (id: string, { dispatch }) {
    const success = await deleteChatLocal(id);

    if (success) {
      dispatch(fetchChatsThunk());
    }
  },
);

export const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setTotalPage(state, action: PayloadAction<number>) {
      state.totalPages = action.payload;
    },
    setPerPage(state, action: PayloadAction<number>) {
      state.perPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChatsThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchChatsThunk.fulfilled, (state, action) => {
        state.chats = action.payload;
        state.isLoading = false;
      })
      .addCase(updateChats.fulfilled, (state, action) => {
        state.chats = action.payload;
      });
  },
});

export const { setPage, setTotalPage, setPerPage } = chatsSlice.actions;
