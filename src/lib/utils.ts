import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Creates a throttled function that only invokes `func` at most once per every `limit` milliseconds.
 *
 * @param func The function to throttle
 * @param limit The time limit in milliseconds
 * @returns A throttled version of the function
 */
export function throttle<Args extends unknown[], R>(func: (this: unknown, ...args: Args) => R, limit: number): (this: unknown, ...args: Args) => void {
  let inThrottle: boolean;

  return function (this: unknown, ...args: Args) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
