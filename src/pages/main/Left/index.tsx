import React from 'react';
import styles from '../style/index.module.scss';

const Left = () => {
  return (
    <div className={styles.left}>
      <div className={styles.box}>
        <h3 className={styles.title}>这里是标题</h3>
        <p className={styles.info}>这里是详情，这里是详情，这里是详情，这里是详情，这里是详情，这里是详情</p>
      </div>
    </div>
  );
};

export default Left;
