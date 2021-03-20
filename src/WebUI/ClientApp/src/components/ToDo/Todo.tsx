import { ChangeEvent, FC, memo, useCallback, useEffect, useState } from 'react';
import React from 'react';
import { ITodoItemSave, ITodosVM } from 'src/types/ToDoItem';
import { isEmpty, map } from 'lodash';
import ToDoListItem from './TodoListItem';
import './Todo.css';
import TodoItemInput from './TodoItemInput';

export interface ITodoInterface {
  getTodoLists: () => void;
  todoLists: ITodosVM[];
  saveTodoItem: (item: ITodoItemSave) => void;
}

const Todo: FC<ITodoInterface> = ({ getTodoLists, todoLists, saveTodoItem }) => {
  useEffect(() => {
    getTodoLists();
  }, []);

  const onSaveHandler = useCallback((value: string, listId: number): void => {
    saveTodoItem({ title: value, listId: listId });
  }, []);

  return (
    <>
      <div className="container">
        <div className="row">
          {!isEmpty(todoLists.lists) &&
            map(todoLists.lists, (fs, index) => {
              return (
                <>
                  <div className="col-6" key={index}>
                    <div className="card">
                      <h2 className="task-title">{fs.title}</h2>
                      <div className="todo-list">
                        {map(fs.items, (item, i) => {
                          return <ToDoListItem done={item.done} value={item.title} />;
                        })}
                      </div>
                      <div className="input-container">
                        <TodoItemInput listId={fs.id} onSave={onSaveHandler} />
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default memo(Todo);
