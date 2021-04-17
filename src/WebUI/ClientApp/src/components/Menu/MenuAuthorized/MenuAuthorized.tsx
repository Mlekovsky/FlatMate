import React, { Component, FC, useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import Container from '@material-ui/core/Container';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SettingsIcon from '@material-ui/icons/Settings';
import HomeIcon from '@material-ui/icons/Home';
import ChatIcon from '@material-ui/icons/Chat';
import ReceiptIcon from '@material-ui/icons/Receipt';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { MenuAuthorizedValues } from './MenuAuthorizedValues';
import MenuLink from '../../common/MenuLink';
import { Modules } from '../../../types/Module';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '100vh',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'hidden',
  },
  container: {
    paddingTop: theme.spacing(12),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

export interface IMenuAuthroizedInterface {
  shortName: string;
  currentModules: number[];
  logout: () => void;
  userInfo: () => void;
  apartamentId: number;
}

export const MenuAuthorized: FC<IMenuAuthroizedInterface> = ({
  shortName,
  currentModules,
  logout,
  children,
  userInfo,
  apartamentId
}) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    userInfo();
  }, []);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            FlatMate {shortName}
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />

        <div>
          <MenuLink
            icon={<HomeIcon />}
            text={MenuAuthorizedValues.Home}
            value={MenuAuthorizedValues.Home}
            to="/Dashboard"
            alwaysDisplay={true}
          />
          <MenuLink
            icon={<MonetizationOnIcon />}
            text={MenuAuthorizedValues.ShoppingList}
            value={MenuAuthorizedValues.ShoppingList}
            to="/"
            moduleId={Modules.SHOPPING_LIST}
            currentModules = {currentModules}
          />
          <MenuLink
            icon={<ReceiptIcon />}
            text={MenuAuthorizedValues.Receipts}
            value={MenuAuthorizedValues.Receipts}
            to="/"
          />
          <MenuLink
            icon={<AssignmentIcon />}
            text={MenuAuthorizedValues.HomeTasks}
            value={MenuAuthorizedValues.HomeTasks}
            to="/Todo"
            moduleId={Modules.TODO_MODULE}
            currentModules={currentModules}
          />
        </div>

        <Divider />

        <div>
          <MenuLink
            icon={<SettingsIcon />}
            text={MenuAuthorizedValues.Settings}
            value={MenuAuthorizedValues.Settings}
            to="/Settings"
            apartamentId={apartamentId}
          />
          <div onClick={logout}>
            <MenuLink
              icon={<AccountCircleIcon />}
              text={MenuAuthorizedValues.Logout}
              value={MenuAuthorizedValues.Logout}
              to="/Logout"
              alwaysDisplay={true}
            />
          </div>
        </div>
        <div></div>
      </Drawer>
      <Container maxWidth="lg" className={classes.container}>
        {children}
      </Container>
    </div>
  );
};
