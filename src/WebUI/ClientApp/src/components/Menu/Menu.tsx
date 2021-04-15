import React, { FC } from 'react';
import MenuAuthorizedContainer from './MenuAuthorized/MenuAuthorizedContainer';
import MenuUnauthorizedContainer from './MenuUnauthroized/MenuUnauthorizedContainer';

export interface IMenu {
  token: string;
}

export const Menu: FC<IMenu> = ({ token, children }) => {
  if (!token) {
    return <MenuUnauthorizedContainer>{children}</MenuUnauthorizedContainer>;
  }

  return <MenuAuthorizedContainer>{children}</MenuAuthorizedContainer>;
};
