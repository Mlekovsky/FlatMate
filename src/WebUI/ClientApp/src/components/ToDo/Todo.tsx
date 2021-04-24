import { FC, memo, useCallback, useEffect, useMemo, useState } from 'react';
import React from 'react';
import {
  ITodoItemDeleteRequest,
  ITodoItemDetailsUpdateRequest,
  ITodoItemSave,
  ITodoItemUpdateRequest,
  ITodoListCreateRequest,
  ITodoListDeleteRequest,
  ITodoListUpdateRequest,
  ITodosVM,
} from '../../types/ToDoItem';
import './Todo.css';
import { Box, CssBaseline, Grid, makeStyles, Paper } from '@material-ui/core';
import { Copyright } from '../User/Copyright';
import { AddTodoList } from './AddTodoList';
import { TodoLists } from './TodoLists';

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

export interface ITodoInterface {
  getTodoLists: (apartamentId: number) => void;
  todoLists: ITodosVM[];
  apartamentId: number;
  addTodoList: (request: ITodoListCreateRequest) => void;
  deleteTodoList: (request: ITodoListDeleteRequest) => void;
  updateTodoList: (request: ITodoListUpdateRequest) => void;
  saveTodoItem: (item: ITodoItemSave) => void;
  updateTodoItem: (item: ITodoItemUpdateRequest) => void;
  updateTodoItemDetails: (item: ITodoItemDetailsUpdateRequest) => void;
  deleteTodoItem: (item: ITodoItemDeleteRequest) => void;
}

const Todo: FC<ITodoInterface> = ({
  getTodoLists,
  todoLists,
  apartamentId,
  addTodoList,
  deleteTodoList,
  updateTodoList,
  saveTodoItem,
  updateTodoItem,
  updateTodoItemDetails,
  deleteTodoItem,
}) => {
  useEffect(() => {
    getTodoLists(apartamentId);
  }, [apartamentId]);

  const onSaveHandler = useCallback(
    (value: string, listId: number, userId: number): void => {
      saveTodoItem({ title: value, listId: listId, apartamentId: apartamentId, assignedUserId: userId });
    },
    [apartamentId],
  );

  const onDeleteHandler = useCallback(
    (id: number) => {
      deleteTodoList({ apartamentId: apartamentId, id: id });
    },
    [apartamentId],
  );

  const onListEditHandler = useCallback(
    (title: string, id: number): void => {
      updateTodoList({ id: id, title: title, apartamentId: apartamentId });
    },
    [apartamentId],
  );

  const onUpdateTodoItemStatusHandler = useCallback(
    (id: number, done: boolean) => {
      updateTodoItem({ apartamentId: apartamentId, id: id, done: done });
    },
    [apartamentId],
  );

  const onTodoItemDetailsUpdateHandler = useCallback(
    (id: number, listId: number, title: string, assignedUserId: number) => {
      updateTodoItemDetails({
        apartamentId: apartamentId,
        id: id,
        listId: listId,
        title: title,
        assignedUserId: assignedUserId,
      });
    },
    [apartamentId],
  );

  const onTodoItemDeleteHandler = useCallback(
    (id: number) => {
      deleteTodoItem({ apartamentId: apartamentId, id: id });
    },
    [apartamentId],
  );

  const userOptions = useMemo(() => {
    return todoLists.users.map((item) => {
      return { value: item.userId, label: '' + item.user };
    });
  }, []);

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
                <h3>Zarządzaj zadaniami i obowiązkami w Waszym mieszkaniu!</h3>
              </Paper>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <Paper className={classes.paper}>
                <h4 style={{ paddingBottom: 10 }}>Dodaj nową listę</h4>
                <AddTodoList apartamentId={apartamentId} addTodoList={addTodoList}></AddTodoList>
              </Paper>
            </Grid>

            <Grid item xs={12} md={12} lg={12}>
              <Paper className={classes.paper}>
                <h4 style={{ paddingBottom: 10 }}>Aktualne listy na Waszym mieszkaniu</h4>
                <TodoLists
                  todoLists={todoLists}
                  onSaveHandler={onSaveHandler}
                  onDeleteHandler={onDeleteHandler}
                  onEditHandler={onListEditHandler}
                  options={userOptions}
                  onTodoItemDeleteHandler={onTodoItemDeleteHandler}
                  onTodoItemDetailsUpdateHandler={onTodoItemDetailsUpdateHandler}
                  onTodoItemStatusUpdateHandler={onUpdateTodoItemStatusHandler}
                ></TodoLists>
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

export default memo(Todo);
