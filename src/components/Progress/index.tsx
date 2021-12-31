import React, { useState, useEffect, useCallback } from 'react';
import classnames from 'classnames';
import './index.less';
import { secondToHS } from '@/utils/common';

type Props = {
  percent: number;
  time?: number;
};

export default function Progress(props: Props) {
  const { percent, time } = props;
  // const [num, setnum] = useState(0);

  // useEffect(() => {
  // let id = setInterval(() => {
  //   if (num > 100) return;
  //   setnum((num) => {
  //     if (num === 100) {
  //       return 100;
  //     } else {
  //       return num + 10;
  //     }
  //   });
  // }, 1000);
  // return () => clearInterval(id);
  // }, []);

  return (
    <div className="progress-components">
      <div className="start">
        <div
          className={classnames({
            actived: percent > 0,
          })}
        />
        <div>Start</div>
      </div>
      <div className="line" style={{ width: `${percent}%` }} />
      <div className="base-line" />
      <div className="final">
        <div
          className={classnames({
            actived: percent === 100,
          })}
        />
        <div>Final</div>
      </div>
      {time !== undefined && <div className="time">{secondToHS(time)}</div>}
    </div>
  );
}
