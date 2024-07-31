import { FC, useEffect } from 'react';

import { useSearchParams } from 'react-router-dom';

import { CreateChatField } from '@/widgets/create-chat-field';
import { MessagesField } from '@/widgets/messages-field';

type SideType = 'messages' | 'createChat' | null;
type SideFieldProps = { sideType: SideType };

export const SideField: FC<SideFieldProps> = ({ sideType }) => {
  const [, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (sideType !== 'messages' && sideType !== 'createChat') {
      setSearchParams((prev) => {
        prev.delete('sideType');

        return new URLSearchParams(prev);
      });
    }
  }, [sideType, setSearchParams]);

  if (sideType === 'messages') {
    return <MessagesField />;
  }

  if (sideType === 'createChat') {
    return <CreateChatField />;
  }

  return null;
};
