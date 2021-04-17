import { IApartamentInfoDTO } from '../../../types/Apartament';
import React, { FC, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Copyright } from '../../User/Copyright';

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

export interface IApartamentSettings {
  apartamentId: number;
  apartament: IApartamentInfoDTO;
}

export const ApartamentSettings: FC<IApartamentSettings> = ({ apartamentId, apartament }) => {
    const classes = useStyles();
  return (
    <>
      <div className={classes.root}>
        <CssBaseline />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <h3>
                  Edytuj właściwości mieszkania {apartament.shortName}
                </h3>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <h4 style={{ paddingBottom: 10 }}>Dodaj nowe mieszkanie!</h4>
                <CreateApartamentContainer></CreateApartamentContainer>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Paper className={classes.paper}>
                <h4 style={{ paddingBottom: 10 }}>Twoje dostępne mieszkania!</h4>
                <AvailableApartamentListContainer></AvailableApartamentListContainer>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6} lg={8}>
              <Paper className={classes.paper}>
                <h4 style={{ paddingBottom: 10 }}>Wybierz mieszkanie, do którego chcesz dołączyć!</h4>
                <ApartamentListContainer></ApartamentListContainer>
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </main>
      </div>
    </>
  );
};
