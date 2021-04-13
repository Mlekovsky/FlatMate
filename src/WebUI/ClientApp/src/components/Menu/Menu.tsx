import React, { FC } from 'react';
import MenuAuthorizedContainer from './MenuAuthorized/MenuAuthorizedContainer';
import MenuUnauthorizedContainer from './MenuUnauthroized/MenuUnauthorizedContainer';

export interface IMenu {
  authorize: (token: string) => void;
}

export const Menu: FC<IMenu> = ({ authorize }, props) => {
  const getToken = () => {
    const token = localStorage.getItem('token');

    if (token) {
      authorize(token);
    }

    return token;
  };

  if (!getToken()) {
    return <MenuUnauthorizedContainer>{props.children}</MenuUnauthorizedContainer>;
  }

  return <MenuAuthorizedContainer>{props.children}</MenuAuthorizedContainer>;
};
