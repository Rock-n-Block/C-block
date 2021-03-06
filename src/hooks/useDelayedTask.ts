import {
  useCallback, useEffect, useRef,
} from 'react';

export const useDelayedTask = (
  callback: () => void,
  delay = 60000,
  shouldRunImmediately = true,
) => {
  const timerIdRef = useRef<NodeJS.Timeout>();
  const shouldRunImmediatelyRef = useRef(shouldRunImmediately);

  const delayedTask = useCallback(() => {
    timerIdRef.current = setTimeout(() => {
      callback();
      delayedTask();
    }, delay);
  }, [callback, delay]);

  const stopTask = useCallback(() => {
    clearTimeout(timerIdRef.current);
  }, []);

  useEffect(() => {
    if (shouldRunImmediatelyRef.current) {
      callback();
      shouldRunImmediatelyRef.current = false;
    }
    delayedTask();

    return stopTask;
  }, [callback, delayedTask, shouldRunImmediately, stopTask]);

  return {
    stopTask,
  };
};
