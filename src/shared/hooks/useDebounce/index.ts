export function useDebounce(func: (...args: any[]) => void, milliseconds: number = 400) {
  const time = milliseconds;
  let timer: number;

  return (...args: any[]) => {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(func, time, ...args);
  };
}
