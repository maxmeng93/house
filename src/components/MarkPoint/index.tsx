import React from 'react';
import styles from './index.module.scss';

console.log(styles);

interface IPointProps {
  left: number;
  top: number;
}

function Point(props: IPointProps) {
  const { left, top } = props;
  return (
    <div 
      className={styles.point} 
      style={{ left, top }}
    ></div>
  );
}

interface IMarkPointProps {
  data: any[];
}

export default function MarkPoint(props: IMarkPointProps) {
  const { data } = props;

  return (
    <div className={styles.wrap}>
      {
        data.map(item => {
          const { left, top } = item;
          return <Point left={left} top={top}></Point>;
        })
      }
    </div>
  );
};
