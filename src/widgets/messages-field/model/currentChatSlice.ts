import {
  createAsyncThunk,
  createSlice,
  GetThunkAPI,
  PayloadAction,
} from '@reduxjs/toolkit';

import { addMessageLocal, fetchChatByIdFromLocal } from '@/utils/api.ts';

export type AsyncThunkConfig = {
  state?: unknown;
  extra?: unknown;
  rejectValue?: unknown;
  serializedErrorType?: unknown;
  pendingMeta?: unknown;
  fulfilledMeta?: unknown;
  rejectedMeta?: unknown;
};

type MessageType = {
  text: string;
  isCurrentUser: boolean;
};

type Chat = {
  messages: MessageType[];
  id: string;
  stage: number;
};

type StatusMessage = 'error' | 'pending' | 'ok';

type InitialState = {
  chat: Chat | null;
  isLoading: boolean;
  statusMessage: StatusMessage;
};

const initialState: InitialState = {
  chat: null,
  isLoading: true,
  statusMessage: 'pending',
};

type SendMessageType = {
  id: string;
  text: string;
};

async function fetchChat(
  id: string,
  { rejectWithValue }: GetThunkAPI<AsyncThunkConfig>,
): Promise<Chat | null> {
  try {
    const response = await fetchChatByIdFromLocal(id);

    if (!response) {
      return null;
    }

    return response;
  } catch (e) {
    rejectWithValue(e);

    return null;
  }
}

export const fetchChatById = createAsyncThunk('currentChat/fetchChatById', fetchChat);
export const updateChat = createAsyncThunk('currentChat/updateChat', fetchChat);

export const sendMessage = createAsyncThunk(
  'currentChat/sendMessage',
  async function ({ id, text }: SendMessageType, { dispatch }) {
    const success = await addMessageLocal(id, text, true);

    if (success) {
      dispatch(updateChat(id));
    } else {
      throw new Error('Something get wrong');
    }
  },
);

export const currentChatSlice = createSlice({
  name: 'currentChat',
  initialState,
  reducers: {
    setStatusMessage(state, action: PayloadAction<StatusMessage>) {
      state.statusMessage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChatById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchChatById.fulfilled, (state, action) => {
        state.chat = action.payload;
        state.isLoading = false;
      })
      .addCase(updateChat.fulfilled, (state, action) => {
        state.chat = action.payload;
      })
      .addCase(sendMessage.fulfilled, (state) => {
        state.statusMessage = 'ok';
      })
      .addCase(sendMessage.rejected, (state) => {
        state.statusMessage = 'error';
      });
  },
});

export const { setStatusMessage } = currentChatSlice.actions;
