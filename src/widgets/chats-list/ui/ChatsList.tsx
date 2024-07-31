import { FC, useEffect } from 'react';

import { useSearchParams } from 'react-router-dom';

import { deleteChat, fetchChatsThunk, setPage, setPerPage } from '../model/chatsSlice.ts';

import { SkeletonChatsList } from './SkeletonChatsList.tsx';

import { useAppDispatch, useAppSelector } from '@/app/store.ts';
import { useResize } from '@/shared/hooks/useResize';
import { Pagination } from '@/shared/ui/pagination';
import { ChatCard } from '@/widgets/chat-card';

export const ChatsList: FC = () => {
  const dispatch = useAppDispatch();
  const { isMobile } = useResize();
  const [searchParams, setSearchParams] = useSearchParams();
  const { isLoading, chats, page, perPage, totalPages } = useAppSelector(
    (state) => state.chats,
  );
  const paramPage = searchParams.get('page');
  const paramId = searchParams.get('id');

  useEffect(() => {
    dispatch(fetchChatsThunk());
  }, [dispatch, page, perPage]);

  useEffect(() => {
    if (isMobile) {
      dispatch(setPerPage(2));
    } else {
      dispatch(setPerPage(4));
    }
  }, [isMobile, dispatch]);

  useEffect(() => {
    const pageQuery = +(paramPage || 0);

    if (pageQuery && pageQuery !== page) {
      dispatch(setPage(pageQuery));
    }
  }, [dispatch, paramPage]);

  useEffect(() => {
    const pageQuery = +(paramPage || 0);

    if (!isLoading && pageQuery > totalPages) {
      setSearchParams((prev) => {
        prev.set('page', totalPages.toString());

        return new URLSearchParams(prev);
      });
    }
  }, [isLoading, paramPage, dispatch]);

  return (
    <div className="flex items-center flex-col">
      {isLoading && <SkeletonChatsList />}
      {!isLoading && (
        <div className="flex flex-col items-center gap-6">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 w-max">
            {chats.map(({ Name, Image, Description, Price, Id }) => (
              <ChatCard
                name={Name}
                image={Image}
                price={Price}
                description={Description}
                key={Id}
                id={Id}
                isUse={Id === paramId}
                deleteHandler={() => {
                  dispatch(deleteChat(Id));
                }}
              />
            ))}
          </div>
          <Pagination
            onChange={(page) => {
              setSearchParams((prev) => {
                prev.set('page', page.toString());

                return new URLSearchParams(prev);
              });
            }}
            page={page}
            count={totalPages}
          />
        </div>
      )}
    </div>
  );
};
