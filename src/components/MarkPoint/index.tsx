import React from 'react';
import styles from './index.module.scss';

interface IPointProps {
  left: number;
  top: number;
  name: string;
}

function Point(props: IPointProps) {
  const { left, top, name } = props;
  return (
    <div 
      className={styles.point} 
      style={{ left, top }}
    >
      <div className={styles.tip}>{name}</div>
    </div>
  );
}

interface IMarkPointProps {
  data: any[];
}

export default function MarkPoint(props: IMarkPointProps) {
  const { data } = props;

  return (
    <>
      {
        data.map((item, index) => {
          const { left, top, name } = item;
          return <Point key={index} left={left} top={top} name={name}></Point>;
        })
      }
    </>
  );
};
