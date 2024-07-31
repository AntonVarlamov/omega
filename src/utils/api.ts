import { v4 as uuidv4 } from 'uuid';

import { OMEGA_CHAT_ID_KEY, OMEGA_CHATS_KEY, QUESTIONS } from './consts.ts';

type ChatCard = {
  Name: string;
  Description: string;
  Image: string;
  Price: number;
  Id: string;
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

export async function fetchChatsFromLocal(
  page: number,
  perPage: number,
): Promise<{ chats: ChatCard[]; 'x-total-count': number }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const chats = JSON.parse(localStorage.getItem(OMEGA_CHATS_KEY) || '[]');
      const curPage = Math.min(Math.ceil(chats.length / perPage), page);

      resolve({
        chats: chats.slice((curPage - 1) * perPage, curPage * perPage),
        'x-total-count': chats.length,
      });
    }, 300);
  });
}

export async function fetchChatByIdFromLocal(id: string): Promise<Chat | undefined> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const chats: Record<string, Chat> = JSON.parse(
        localStorage.getItem(OMEGA_CHAT_ID_KEY) || '{}',
      );

      resolve(chats[id]);
    }, 300);
  });
}

export async function addMessageLocal(id: string, text: string, isCurrentUser: boolean) {
  return new Promise<boolean>((resolve, reject) => {
    setTimeout(() => {
      try {
        const chats: Record<string, Chat> = JSON.parse(
          localStorage.getItem(`${OMEGA_CHAT_ID_KEY}`) || '{}',
        );

        chats[id].messages.push({ text, isCurrentUser });
        chats[id].stage = Math.min(chats[id].stage + 1, 3);

        if (chats[id].stage in QUESTIONS) {
          chats[id].messages.push({
            text: QUESTIONS[chats[id].stage],
            isCurrentUser: false,
          });
        }

        localStorage.setItem(OMEGA_CHAT_ID_KEY, JSON.stringify(chats));
      } catch (err) {
        reject(err);
      }

      resolve(true);
    }, 300);
  }).catch(() => false);
}

export async function deleteChatLocal(id: string) {
  return new Promise<boolean>((resolve, reject) => {
    setTimeout(() => {
      try {
        const chatsObj: Record<string, Chat> = JSON.parse(
          localStorage.getItem(`${OMEGA_CHAT_ID_KEY}`) || '{}',
        );
        const chatsArr: Array<ChatCard> = JSON.parse(
          localStorage.getItem(OMEGA_CHATS_KEY) || '[]',
        );

        delete chatsObj[id];
        localStorage.setItem(OMEGA_CHAT_ID_KEY, JSON.stringify(chatsObj));
        localStorage.setItem(
          OMEGA_CHATS_KEY,
          JSON.stringify(chatsArr.filter(({ Id }) => Id !== id)),
        );
      } catch (e) {
        reject(e);
      }

      resolve(true);
    }, 300);
  }).catch(() => false);
}

export async function createChatLocal(card: Omit<ChatCard, 'Id'>) {
  return new Promise<boolean>((resolve, reject) => {
    setTimeout(() => {
      try {
        const chatsObj: Record<string, Chat> = JSON.parse(
          localStorage.getItem(`${OMEGA_CHAT_ID_KEY}`) || '{}',
        );
        const chatsArr: Array<ChatCard> = JSON.parse(
          localStorage.getItem(OMEGA_CHATS_KEY) || '[]',
        );
        const id = uuidv4();
        const newCard = { ...card, Id: id };

        chatsArr.push(newCard);
        chatsObj[id] = {
          messages: [{ text: QUESTIONS[0], isCurrentUser: false }],
          id,
          stage: 0,
        };
        localStorage.setItem(OMEGA_CHAT_ID_KEY, JSON.stringify(chatsObj));
        localStorage.setItem(OMEGA_CHATS_KEY, JSON.stringify(chatsArr));
      } catch (e) {
        reject(e);
      }

      resolve(true);
    }, 300);
  }).catch(() => false);
}
