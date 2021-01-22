import React, { FC, memo, useCallback } from 'react';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SettingsIcon from '@material-ui/icons/Settings';

import './Styles.css';
import MenuLink from '../common/MenuLink';
import { SecondaryListItemsValues } from './SecondaryListItemsValues';

interface ISecondaryListItem {
  selectedValue: string | number;
  onChange: (value: string | number) => void;
}

const SecondaryListItems: FC<ISecondaryListItem> = ({ selectedValue, onChange }) => {
  const onChangeHandler = useCallback((value: string | number) => {
    onChange(value);
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <MenuLink
        icon={<SettingsIcon />}
        onChange={onChangeHandler}
        selectedValue={selectedValue}
        text={SecondaryListItemsValues.Settings}
        value={SecondaryListItemsValues.Settings}
        to="/"
      />
      <MenuLink
        icon={<AccountCircleIcon />}
        onChange={onChangeHandler}
        selectedValue={selectedValue}
        text={SecondaryListItemsValues.Login}
        value={SecondaryListItemsValues.Login}
        to="/Login"
      />
    </div>
  );
};

export default memo(SecondaryListItems);
