import { clsx, type ClassValue } from "clsx";
import { useCallback, useRef } from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const useDebounce = <F extends (...args: never[]) => void>(
  cbFn: F,
  wait: number,
) => {
  const timeoutId = useRef<ReturnType<typeof setTimeout> | undefined>();

  const debounceFn = useCallback(
    (...args: Parameters<F>) => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }

      timeoutId.current = setTimeout(() => {
        cbFn(...args);
      }, wait);
    },
    [cbFn, wait],
  );

  return debounceFn;
};
