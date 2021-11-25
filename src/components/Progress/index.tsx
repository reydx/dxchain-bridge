import React, { useState, useEffect, useCallback } from 'react';
import classnames from 'classnames';
import './index.less';

type Props = {
  showTime?: boolean;
};

export default function Progress(props: Props) {
  const { showTime = false } = props;
  const [num, setnum] = useState(0);

  useEffect(() => {
    let id = setInterval(() => {
      if (num > 100) return;
      setnum((num) => {
        if (num === 100) {
          return 100;
        } else {
          return num + 10;
        }
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="progress-components">
      <div className="start">
        <div
          className={classnames({
            actived: num > 0,
          })}
        />
        <div>Start</div>
      </div>
      <div className="line" style={{ width: `${num}%` }} />
      <div className="base-line" />
      <div className="final">
        <div
          className={classnames({
            actived: num === 100,
          })}
        />
        <div>Final</div>
      </div>
      {showTime && <div className="time">12:18</div>}
    </div>
  );
}
