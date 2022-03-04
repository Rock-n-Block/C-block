import {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { TNullable } from 'types';

interface IUseCountdownTimer {
  startTime: number; // unix timestamp as seconds
  period?: number; // unix timestamp as seconds
  endTime?: number; // unix timestamp as seconds
  disabled?: boolean;
}

export const useCountdownTimer = ({
  startTime,
  period,
  endTime = Date.now(),
  disabled = false,
}: IUseCountdownTimer): {
  secondsRemaining: TNullable<number>;
} => {
  const [secondsRemaining, setSecondsRemaining] = useState<TNullable<number>>(null);
  const [currentSeconds, setCurrentSeconds] = useState(startTime);

  const timerIntervalIdRef = useRef<NodeJS.Timeout>();

  const tick = useCallback(() => {
    setCurrentSeconds((prevSeconds) => prevSeconds + 1);
  }, []);

  const cleanUpTimer = useCallback(() => {
    if (timerIntervalIdRef.current) {
      clearTimeout(timerIntervalIdRef.current);
    }
  }, []);

  useEffect(() => {
    if (disabled) return cleanUpTimer();
    let endTimeValidated: number; // if period presented -> find endTime by period, OR use endTime
    if (period) {
      endTimeValidated = startTime + period;
    } else {
      endTimeValidated = endTime;
    }

    const secondsRemainingCalc = endTimeValidated - currentSeconds;
    const hasTimerFinished = secondsRemainingCalc > 0;

    timerIntervalIdRef.current = setTimeout(tick, 1000);

    if (hasTimerFinished) {
      setSecondsRemaining(secondsRemainingCalc);
    } else {
      cleanUpTimer();
    }

    return cleanUpTimer;
  }, [
    startTime,
    endTime,
    period,
    currentSeconds,
    disabled,
    setSecondsRemaining,
    cleanUpTimer,
    tick,
  ]);

  return { secondsRemaining };
};
