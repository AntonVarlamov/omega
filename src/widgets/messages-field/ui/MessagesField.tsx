import { FC, useEffect } from 'react';

import clsx from 'clsx';
import { useSearchParams } from 'react-router-dom';

import {
  fetchChatById,
  sendMessage,
  setStatusMessage,
} from '../model/currentChatSlice.ts';

import { useAppDispatch, useAppSelector } from '@/app/store.ts';
import { SendMessage } from '@/features/send-message';

export const MessagesField: FC = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { isLoading, chat, statusMessage } = useAppSelector((state) => state.currentChat);
  const id = searchParams.get('id');

  useEffect(() => {
    if (!id) {
      setSearchParams((prev) => {
        prev.delete('id');
        prev.delete('sideType');

        return new URLSearchParams(prev);
      });
    } else {
      dispatch(fetchChatById(id));
    }
  }, [id]);

  useEffect(() => {
    if (!isLoading && !chat) {
      setSearchParams((prev) => {
        prev.delete('id');
        prev.delete('sideType');

        return new URLSearchParams(prev);
      });
    }
  }, [isLoading, chat]);

  return (
    <div className="w-full sm:max-w-96 min-h-full sm:pt-16">
      {isLoading ? (
        <h2>Loading...</h2>
      ) : (
        !!chat && (
          <div className="flex flex-col gap-10">
            <div className="overflow-y-auto flex flex-col gap-5 sm:h-[50vh]">
              {chat.messages.map((message, id) => (
                <p
                  // eslint-disable-next-line react/no-array-index-key
                  key={id + message.text}
                  className={clsx('p-3 rounded-xl w-4/5 break-words', {
                    'bg-violet-100': !message.isCurrentUser,
                    'bg-blue-300': message.isCurrentUser,
                    'ml-auto': message.isCurrentUser,
                    'mr-auto': !message.isCurrentUser,
                  })}
                >
                  {message.text}
                </p>
              ))}
            </div>
            <SendMessage
              onSubmit={(text) => {
                dispatch(sendMessage({ id: id as string, text }));
              }}
              statusMessage={statusMessage}
              afterSubmit={() => {
                dispatch(setStatusMessage('pending'));
              }}
            />
          </div>
        )
      )}
    </div>
  );
};
