import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector, useStore } from 'react-redux';

import { chatsSlice } from '@/widgets/chats-list';
import { createChatSlice } from '@/widgets/create-chat-field/model/createChatSlice.ts';
import { currentChatSlice } from '@/widgets/messages-field';

export const store = configureStore({
  reducer: {
    chats: chatsSlice.reducer,
    currentChat: currentChatSlice.reducer,
    createChat: createChatSlice.reducer,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore: () => AppStore = useStore;
