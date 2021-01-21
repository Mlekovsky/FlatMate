import React, { FC, memo, useCallback } from 'react';

import HomeIcon from '@material-ui/icons/Home';
import ChatIcon from '@material-ui/icons/Chat';
import ReceiptIcon from '@material-ui/icons/Receipt';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import AssignmentIcon from '@material-ui/icons/Assignment';

import './Styles.css';
import MenuLink from '../common/MenuLink';
import { MainListItemsValues } from './MainListItemsValues';

interface IMainListItems {
  selectedValue: string | number;
  onChange: (value: string | number) => void;
}

const MainListItems: FC<IMainListItems> = ({ selectedValue, onChange }) => {
  const onChangeHandler = useCallback((value: string | number) => {
    onChange(value);
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <MenuLink
        icon={<HomeIcon />}
        onChange={onChangeHandler}
        selectedValue={selectedValue}
        text={MainListItemsValues.Home}
        value={MainListItemsValues.Home}
        to="/Home"
      />
      <MenuLink
        icon={<ChatIcon />}
        onChange={onChangeHandler}
        selectedValue={selectedValue}
        text={MainListItemsValues.Chat}
        value={MainListItemsValues.Chat}
        to="/"
      />
      <MenuLink
        icon={<MonetizationOnIcon />}
        onChange={onChangeHandler}
        selectedValue={selectedValue}
        text={MainListItemsValues.ShoppingList}
        value={MainListItemsValues.ShoppingList}
        to="/"
      />
      <MenuLink
        icon={<ReceiptIcon />}
        onChange={onChangeHandler}
        selectedValue={selectedValue}
        text={MainListItemsValues.Receipts}
        value={MainListItemsValues.Receipts}
        to="/"
      />
      <MenuLink
        icon={<AssignmentIcon />}
        onChange={onChangeHandler}
        selectedValue={selectedValue}
        text={MainListItemsValues.HomeTasks}
        value={MainListItemsValues.HomeTasks}
        to="/"
      />
    </div>
  );
};

export default memo(MainListItems);
