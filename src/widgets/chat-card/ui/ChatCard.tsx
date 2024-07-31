import { FC } from 'react';

import clsx from 'clsx';
import { useSearchParams } from 'react-router-dom';

import styles from './styles.module.css';

import { MessageSvg } from '@/shared/ui/message-svg';
import { TrashcanSvg } from '@/shared/ui/trashcan-svg';

type ChatCardProps = {
  name: string;
  description: string;
  image: string;
  price: Number;
  id: string;
  isUse?: boolean;
  deleteHandler?: () => void;
};

export const ChatCard: FC<ChatCardProps> = ({
  name,
  price,
  description,
  image,
  id,
  isUse = false,
  deleteHandler,
}) => {
  const [, setSearchParams] = useSearchParams();

  return (
    <div
      className="border border-gray-200 bg-white w-max rounded-xl relative cursor-pointer"
      role="presentation"
      onClick={() => {
        setSearchParams((prev) => {
          prev.set('sideType', 'messages');
          prev.set('id', id);

          return new URLSearchParams(prev);
        });
      }}
    >
      <div
        role="presentation"
        className={clsx('relative', styles.img)}
        onClick={(event) => {
          event.stopPropagation();
          if (deleteHandler) {
            deleteHandler();
          }
        }}
      >
        <img
          src={image}
          alt={description}
          className="rounded-t-xl"
          width={335}
          height={265}
        />
        <div
          className={clsx(
            'absolute hidden justify-center items-center bg-black/50 top-0 left-0 h-full w-full',
            styles.deleteArea,
          )}
        >
          <TrashcanSvg />
        </div>
      </div>
      <div className="p-6 gap-2 grid grid-cols-2 text-gray-900">
        <span className="text-xl font-semibold">{name}</span>
        <span className="text-xl text-right font-semibold">{price.toString()} ₽</span>
        <span className="text-gray-500">{description}</span>
      </div>
      {isUse && (
        <div className="absolute top-0 right-0 translate-x-2/4 -translate-y-2/4 z-10">
          <MessageSvg />
        </div>
      )}
    </div>
  );
};
