import React, { FC, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Copyright } from '../User/Copyright';
import ApartamentListContainer from '../Apartaments/ApartamentList/ApartamentListContainer';
import AvailableApartamentListContainer from '../Apartaments/AvailableApartaments/AvailableApartamentListContainer';
import CreateApartamentContainer from '../Apartaments/CreateApartament/CreateApartamentContainer';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
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

export interface IDashboard {
  getUserInfo: () => void;
  firstName: string,
  lastName: string,
  email: string
}

export const Dashboard: FC<IDashboard> = ({getUserInfo, firstName, lastName, email}) => {

  useEffect(() => {
    getUserInfo();
  }, []);

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper className={classes.paper}><h3>Witaj {firstName} {lastName}!</h3></Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <h4 style={{paddingBottom: 10}}>Dodaj nowe mieszkanie!</h4>
              <CreateApartamentContainer></CreateApartamentContainer>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Paper className={classes.paper}>
              <h4 style={{paddingBottom: 10}}>Twoje dostępne mieszkania!</h4>
            <AvailableApartamentListContainer></AvailableApartamentListContainer></Paper>
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <Paper className={classes.paper}>
              <h4 style={{paddingBottom: 10}}>Wybierz mieszkanie, do którego chcesz dołączyć!</h4>
              <ApartamentListContainer></ApartamentListContainer>
            </Paper>
          </Grid>
          
        </Grid>
        <Box pt={4}>
          <Copyright />
        </Box>
      </main>
    </div>
  );
};
