import React, { memo, FC } from 'react';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Link, NavLink } from 'react-router-dom';
import classNames from 'classnames';

export interface IMenuLink {
  icon: React.ReactNode;
  to: string;
  text: string;
  value: string | number;
  moduleId?: number | null;
  currentModules?: number[] | null;
  apartamentId?: number | null;
  alwaysDisplay?: boolean | null;
}

const MenuLink: FC<IMenuLink> = ({ value, text, to, icon, moduleId, currentModules, apartamentId, alwaysDisplay }) => {
  if ((currentModules && moduleId && currentModules.includes(moduleId)) || apartamentId || alwaysDisplay) {
    return (
      <NavLink tag={Link} className={classNames('text-dark')} to={to}>
        <ListItem button>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={text} />
        </ListItem>
      </NavLink>
    );
  } else {
    return <></>;
  }
};

export default memo(MenuLink);
