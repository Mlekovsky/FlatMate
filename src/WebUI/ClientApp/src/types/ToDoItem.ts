export interface IToDoItem {
  id: number;
  listId: number;
  title: string;
  done: boolean;
  priority: number;
  note: string;
}

export interface ITodoList {
  id: number;
  title: string;
  items: IToDoItem[];
}

export interface ITodoItemSave {
  title: string;
  listId: number;
}

export interface ITodosVM {
  lists: ITodoList[];
  priorityLevels: IPriorityLevelDto[];
}

export interface IPriorityLevelDto {
  value?: number;
  name?: string | undefined;
}
