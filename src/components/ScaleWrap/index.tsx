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
    const defaultWidth = 1920;
    const defaultHeight = 1080;
    const width = window.innerWidth;
    const height = window.innerHeight;
    const ratio = Math.min(width / defaultWidth, height / defaultHeight);
    dispatch(setScale(ratio));
  }

  return (
    <div 
      style={{ transform: `scale(${scale}) translate(-50%, -50%)` }} 
      className={styles.wrap}
    >{props.children}</div>
  );
};

export default ScaleWrap;
