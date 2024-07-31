import { FC, useEffect, useRef } from 'react';

import clsx from 'clsx';

type SendMessageProps = {
  onSubmit: (text: string) => void;
  statusMessage: 'error' | 'pending' | 'ok';
  afterSubmit: () => void;
};

export const SendMessage: FC<SendMessageProps> = ({
  onSubmit,
  statusMessage = 'pending',
  afterSubmit,
}) => {
  const ref = useRef<null | HTMLTextAreaElement>(null);
  const isError = statusMessage === 'error';

  useEffect(() => {
    if (statusMessage === 'ok') {
      if (ref.current && 'value' in ref.current) {
        ref.current.value = '';
      }

      afterSubmit();
    }
  }, [statusMessage, afterSubmit]);

  return (
    <textarea
      ref={ref}
      className={clsx('resize-none outline-none w-full border rounded-md p-4', {
        'border-red-600': isError,
        'focus:shadow-errorMessage': isError,
        'focus:shadow-focusedMessage': !isError,
        'focus:border-violet-700 ': !isError,
      })}
      onKeyDown={(event) => {
        if (
          !event.shiftKey &&
          event.key === 'Enter' &&
          Object.getPrototypeOf(event.target) === HTMLTextAreaElement.prototype
        ) {
          const { value } = event.target as HTMLTextAreaElement;

          if (value !== '') {
            onSubmit(value);
          }

          if (event.preventDefault) {
            event.preventDefault();
          }

          return false;
        }
      }}
    />
  );
};
