import { Box, CssBaseline, Grid, makeStyles, Paper } from '@material-ui/core';
import React, { FC } from 'react';
import { Copyright } from '../User/Copyright';

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

export interface IShoppingList {}

export const ShoppingList: FC<IShoppingList> = ({}) => {
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
                <h3>Sprawdź, co trzeba kupić na mieszkanie!</h3>
              </Paper>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <Paper className={classes.paper}>
                <h4 style={{ paddingBottom: 10 }}>Nowa lista zakupów</h4>
              </Paper>
            </Grid>

            <Grid item xs={12} md={12} lg={12}>
              <Paper className={classes.paper}>
                <h4 style={{ paddingBottom: 10 }}>Aktualne listy zakupów</h4>
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
