import React from 'react';
import styles from './index.module.scss';

interface IPoint {
  left: number;
  top: number;
  name?: string;
  [key: string]: any;
}

interface IPointProps {
  data: IPoint;
  showName?: boolean;
  clickName?: Function;
}

function Point(props: IPointProps) {
  const { data, showName = true, clickName } = props;
  const { left, top, name } = data;

  const clickNameHandler = () => {
    clickName?.(data);
  }

  return (
    <div 
      className={styles.point} 
      style={{ left, top }}
    >
      {showName && name ? <div className={styles.name} onClick={clickNameHandler}>{name}</div> : null} 
    </div>
  );
}

interface IMarkPointProps {
  data: IPoint[];
  clickName?: Function;
}

export default function MarkPoint(props: IMarkPointProps) {
  const { data, clickName } = props;

  return (
    <>
      {
        data.map((item, index) => {
          return <Point key={index} data={item} clickName={clickName}></Point>;
        })
      }
    </>
  );
};
