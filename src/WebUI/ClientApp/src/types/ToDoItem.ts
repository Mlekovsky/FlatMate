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

export interface ITodosVM {
  lists: ITodoList[];
  priorityLevels: IPriorityLevelDto[];
}

export interface IPriorityLevelDto {
  value?: number;
  name?: string | undefined;
}

// Requests
export interface ITodoItemSave {
  title: string;
  listId: number;
  apartamentId: number;
}

export interface ITodoItemUpdateRequest {
  id: number;
  title: string;
  done: boolean;
  apartamentId: number;
}

export interface ITodoItemDeleteRequest {
  id: number;
  apartamentId: number;
}

export interface ITodoListCreateRequest {
  apartamentId: number;
  title: string
}

export interface ITodoListDeleteRequest {
  id: number;
  apartamentId: number;
}

export interface ITodoListUpdateRequest {
  id: number;
  title: string;
  apartamentId: number;
}