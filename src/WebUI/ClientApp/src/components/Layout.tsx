import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { Menu } from './Menu/Menu';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

export const Layout = (props: {
  children:
    | string
    | number
    | boolean
    | {}
    | React.ReactElement<
        any,
        | string
        | ((
            props: any,
          ) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null)
        | (new (props: any) => React.Component<any, any, any>)
      >
    | React.ReactNodeArray
    | React.ReactPortal;
}) => {
  const displayName = Layout.name;
  const classes = useStyles();

  return (
    <div>
        <Menu>
            {props.children}
        </Menu>
    </div>
  );
};
