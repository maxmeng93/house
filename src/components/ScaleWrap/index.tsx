import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { setScale, getScale } from '@/store/global';
import styles from './index.module.scss';

interface IProps {
  [key: string]: any
}

const ScaleWrap: React.FC<IProps> = (props) => {
  const scale = useAppSelector(getScale);
  const dispatch = useAppDispatch();

  useEffect(() => {
    calcRatio();
    window.addEventListener('resize', calcRatio);
  }, []);

  function calcRatio() {
    const w = window.innerWidth / 1920;
    const h = window.innerHeight / 1080;
    const ratio = w < h ? w : h;
    dispatch(setScale(ratio));
  }

  return (
    <div 
      style={{ transform: `scale(${scale})` }} 
      className={styles.wrap}
    >{props.children}</div>
  );
};

export default ScaleWrap;
