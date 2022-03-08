import React from 'react';
import styles from './style/index.module.scss';
import Center from './Center';
import Right from './Right';
import Left from './Left';


export default function MapPage() {
  return (
    <div className={styles.page}>
      <Center></Center>
      <div className={styles.left}></div>
      <Left></Left>
      <Right></Right>
    </div>
  );
}
