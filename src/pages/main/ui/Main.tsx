import { FC } from 'react';

import { useSearchParams } from 'react-router-dom';

import { useResize } from '@/shared/hooks/useResize';
import { ChatsList } from '@/widgets/chats-list';
import { SideField } from '@/widgets/side-field';

type SideType = 'messages' | 'createChat' | null;

export const Main: FC = () => {
  const { isDesktop } = useResize();
  const [searchParams] = useSearchParams();
  const sideType = searchParams.get('sideType') as SideType;

  return (
    <div className="flex justify-center lg:gap-12 mt-14 relative">
      {(!sideType || isDesktop) && <ChatsList />}
      {!!sideType && <SideField sideType={sideType} />}
    </div>
  );
};
