import { useEffect, useState } from 'react';

import { useDebounce } from '@/shared/hooks/useDebounce';

export const useResize = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const handleResize = useDebounce(() => {
    setIsMobile(window.innerWidth < 768);
    setIsDesktop(window.innerWidth >= 1024);
  }, 200);

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  return {
    isMobile,
    isDesktop,
  };
};
