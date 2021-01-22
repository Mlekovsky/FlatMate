import React, { FC, memo } from 'react';
import classnames from 'classnames';

interface ITodoListItem {
  value: string;
  done: boolean;
}

const ToDoListItem: FC<ITodoListItem> = ({ value, done }) => {
  return (
    <li className="list-item">
      <i className={classnames({ 'fas fa-check-circle': done == true }, { 'far fa-check-circle': done == false })}></i>
      <span className="item-value">{value}</span>
    </li>
  );
};

export default memo(ToDoListItem);
