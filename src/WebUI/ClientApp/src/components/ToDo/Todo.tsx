import { FC, memo } from 'react';
import React from 'react';

export interface ITodoInterface {}

const Todo: FC<ITodoInterface> = ({}) => {
  return <>Im working!</>;
};

export default memo(Todo);
