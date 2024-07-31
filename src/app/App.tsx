import { FC, useLayoutEffect } from 'react';

import { Main } from '@/pages/main';
import { createChats } from '@/utils/seed.ts';

export const App: FC = () => {
  useLayoutEffect(() => {
    createChats();
  }, []);

  return <Main />;
};
