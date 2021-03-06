import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

import HomeIcon from '@material-ui/icons/Home';
import ChatIcon from '@material-ui/icons/Chat';
import ReceiptIcon from '@material-ui/icons/Receipt';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SettingsIcon from '@material-ui/icons/Settings';

import { NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './Styles.css';
import { LoginMenu } from '../api-authorization/LoginMenu';

export const mainListItems = (
  <div>
    <NavLink tag={Link} className="text-dark" to="/Home">
      <ListItem button selected>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>
    </NavLink>
    <NavLink tag={Link} className="text-dark" to="/">
      <ListItem button>
        <ListItemIcon>
          <ChatIcon />
        </ListItemIcon>
        <ListItemText primary="Chat" />
      </ListItem>
    </NavLink>
    <NavLink tag={Link} className="text-dark" to="/">
      <ListItem button>
        <ListItemIcon>
          <ReceiptIcon />
        </ListItemIcon>
        <ListItemText primary="Shopping list" />
      </ListItem>
    </NavLink>
    <NavLink tag={Link} className="text-dark" to="/">
      <ListItem button>
        <ListItemIcon>
          <MonetizationOnIcon />
        </ListItemIcon>
        <ListItemText primary="Receipts" />
      </ListItem>
    </NavLink>
    <NavLink tag={Link} className="text-dark" to="/">
      <ListItem button>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Home tasks" />
      </ListItem>
    </NavLink>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>System</ListSubheader>
    <NavLink tag={Link} className="text-dark" to="/">
      <ListItem button>
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary="Settings" />
      </ListItem>
    </NavLink>
    <NavLink tag={Link} className="text-dark" to="/Login">
      <ListItem button>
        <ListItemIcon>
          <AccountCircleIcon />
        </ListItemIcon>
        <ListItemText primary="Login" />
      </ListItem>
    </NavLink>
  </div>
);
