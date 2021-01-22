import React, { ChangeEvent, FC, memo, useCallback, useState } from 'react';

interface ITodoItemInput {
  listId: number;
  onSave: (value: string, listId: number) => void;
}

const TodoItemInput: FC<ITodoItemInput> = ({ listId, onSave }) => {
  const [name, setName] = useState('');

  const onChangeHandler = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
    setName(event.target.value);
  }, []);

  const onSaveClick = useCallback((): void => {
    onSave(name, listId);
  }, [name, listId]);

  return (
    <>
      <input className="input-field" type="text" value={name} onChange={onChangeHandler} />
      <button onClick={onSaveClick}>Add</button>
    </>
  );
};

export default memo(TodoItemInput);
