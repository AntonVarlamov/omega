import { FC } from 'react';

import { useResize } from '@/shared/hooks/useResize';

export const SkeletonChatsList: FC = () => {
  const { isMobile } = useResize();

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 w-max">
        {Array(isMobile ? 2 : 4)
          .fill(0)
          .map((_, key) => (
            <div
              // eslint-disable-next-line react/no-array-index-key
              key={key}
              style={{ width: '21.0625rem', height: '23.5625rem' }}
              className="animate-pulse bg-gray-300 rounded-xl"
            />
          ))}
      </div>

      <div className="h-10 w-80 bg-gray-300 rounded-xl" />
    </div>
  );
};
