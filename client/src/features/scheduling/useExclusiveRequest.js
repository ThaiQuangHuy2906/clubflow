import { useEffect, useRef, useState } from 'react';

// Allows one request at a time. A second click while a request is out does nothing.
export function useExclusiveRequest() {
  const active = useRef(null);
  const [pending, setPending] = useState('');
  useEffect(() => () => active.current?.abort(), []);

  async function run(kind, task) {
    if (active.current) return;
    const controller = new AbortController();
    active.current = controller;
    setPending(kind);
    try {
      await task(controller.signal);
    } finally {
      if (active.current === controller) active.current = null;
      if (!controller.signal.aborted) setPending('');
    }
  }
  return [pending, run];
}
