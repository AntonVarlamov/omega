import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { createChatLocal } from '@/utils/api.ts';
import { updateChats } from '@/widgets/chats-list/model/chatsSlice.ts';

type ChatCardType = {
  Name: string;
  Description: string;
  Image: string;
  Price: number;
  Id: string | null;
};

export const createChat = createAsyncThunk(
  'createChat/createChat',
  async function (chat: Omit<ChatCardType, 'Id'>, { dispatch }) {
    const success = await createChatLocal(chat);

    fetch('https://www.example.com/', {
      method: 'POST',
      body: JSON.stringify(chat),
      mode: 'no-cors',
    })
      .then(() => {
        console.log('Успешный запрос на www.example.com');
      })
      .catch(() => {
        console.log('Провальный запрос на www.example.com');
      });

    if (success) {
      dispatch(updateChats());
    }
  },
);

export const createChatSlice = createSlice({
  name: 'createChat',
  initialState: {},
  reducers: {},
});
