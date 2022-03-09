import React from 'react';
import Center from './Center';
import Left from './Left';
import Right from './Right';
import ScaleWrap from '@/components/ScaleWrap';

const MainPage = () => {
  return (
    <div>
      <ScaleWrap>
        <Center></Center>
        <Left></Left>
        <Right></Right>
      </ScaleWrap>
    </div>
  );
};

export default MainPage;
