import { v4 as uuidv4 } from 'uuid';

import {
  OMEGA_CHAT_ID_KEY,
  OMEGA_CHATS_KEY,
  QUESTIONS,
  STANDART_IMAGE,
} from './consts.ts';

type MessageType = {
  text: string;
  isCurrentUser: boolean;
};

type Chat = {
  messages: MessageType[];
  id: string;
  stage: number;
};

export function createChats(): void {
  const chatsArr = JSON.parse(localStorage.getItem(OMEGA_CHATS_KEY) || '[]');
  const chatsObj = localStorage.getItem(OMEGA_CHAT_ID_KEY);

  if (chatsObj || chatsArr.length > 0) {
    return;
  }

  const chatsById: Record<string, Chat> = {};
  const chats = Array(20)
    .fill(0)
    .map((_, key) => {
      const id = uuidv4();

      chatsById[id] = {
        messages: [{ text: QUESTIONS[0], isCurrentUser: false }],
        id,
        stage: 0,
      };

      return {
        Name: `name${key}`,
        Description: 'Some desc',
        Image: STANDART_IMAGE,
        Price: 100 + key,
        Id: id,
      };
    });

  localStorage.setItem(OMEGA_CHATS_KEY, JSON.stringify(chats));
  localStorage.setItem(OMEGA_CHAT_ID_KEY, JSON.stringify(chatsById));
}
