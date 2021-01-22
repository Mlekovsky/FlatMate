import React, { memo, FC } from 'react';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Link, NavLink } from 'react-router-dom';
import classNames from 'classnames';

export interface IMenuLink {
  icon: React.ReactNode;
  to: string;
  text: string;
  value: string | number;
  selectedValue: string | number;
  onChange: (value: string | number) => void;
}

const MenuLink: FC<IMenuLink> = ({ value, selectedValue, onChange, text, to, icon }) => {
  const onChangeHandler = () => {
    if (value != selectedValue) onChange(value);
  };

  return (
    <NavLink
      tag={Link}
      className={classNames('text-dark', { active: value == selectedValue })}
      to={to}
      onClick={onChangeHandler}
    >
      <ListItem button>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={text} />
      </ListItem>
    </NavLink>
  );
};

export default memo(MenuLink);
