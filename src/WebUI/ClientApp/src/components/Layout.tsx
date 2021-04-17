import React, { Component, FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Menu } from './Menu/Menu';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

export interface ILayout {
  token: string;
}

export const Layout: FC<ILayout> = ({ token, children }) => {
  const displayName = Layout.name;
  const classes = useStyles();

  return (
    <div>
      <Menu token={token}>{children}</Menu>
    </div>
  );
};
