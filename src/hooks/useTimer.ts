import React, { useRef, useState } from 'react';

export default function useTimer() {
  const [time, settTme] = useState(0);
  let id: NodeJS.Timer | null = null;

  const start = () => {
    if (id) return;
    id = setInterval(() => {
      settTme((time) => time + 1);
    }, 1000);
  };

  const end = () => {
    if (id) clearInterval(id);
  };

  return {
    time,
    end,
    start,
  };
}
