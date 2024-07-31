import { FC } from 'react';

import clsx from 'clsx';

type PaginationProps = {
  onChange: (page: number) => void;
  page: number;
  count: number;
};

export const Pagination: FC<PaginationProps> = ({ onChange, count, page }) => {
  const pages = Array(count)
    .fill(0)
    .map((_, key) => {
      const isCurPage = page === key + 1;

      return (
        <li
          // eslint-disable-next-line react/no-array-index-key
          key={key}
        >
          <button
            className={clsx('size-10 flex justify-center items-center', {
              'text-white': isCurPage,
              'bg-indigo-500': isCurPage,
              'border-gray-200': !isCurPage,
              border: !isCurPage,
              'text-slate-500': !isCurPage,
              'bg-white': !isCurPage,
              'cursor-pointer': !isCurPage,
              'hover:bg-gray-100': !isCurPage,
            })}
            disabled={page === key + 1}
            type="button"
            onClick={() => onChange(key + 1)}
          >
            {key + 1}
          </button>
        </li>
      );
    });

  return (
    <div className="flex">
      <button
        type="button"
        onClick={() => {
          onChange(page - 1);
        }}
        className={clsx(
          'border border-gray-200 text-slate-500 size-10 flex justify-center items-center bg-white border-r-0 rounded-l',
          { 'bg-gray-100': page === 1 },
        )}
        disabled={page === 1}
      >
        {'<'}
      </button>
      <ul className="flex">{pages}</ul>
      <button
        type="button"
        onClick={() => {
          onChange(page + 1);
        }}
        className={clsx(
          'border border-gray-200 text-slate-500 size-10 flex justify-center items-center bg-white border-l-0 rounded-r',
          { 'bg-gray-100': page === count },
        )}
        disabled={page === count}
      >
        {'>'}
      </button>
    </div>
  );
};
