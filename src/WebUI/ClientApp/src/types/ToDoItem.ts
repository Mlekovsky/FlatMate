export interface IToDoItem {
  id: number;
  listId: number;
  title: string;
  done: boolean;
  priority: number;
  note: string;
  assignedUser: string;
  assignedUserId: number;
}

export interface ITodoList {
  id: number;
  title: string;
  items: IToDoItem[];
}

export interface IAssignableUserDto {
  userId: number;
  user: string;
}

export interface ITodosVM {
  lists: ITodoList[];
  priorityLevels: IPriorityLevelDto[];
  users: IAssignableUserDto[];
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
  assignedUserId: number;
}

export interface ITodoItemUpdateRequest {
  id: number;
  done: boolean;
  apartamentId: number;
}

export interface ITodoItemDetailsUpdateRequest {
  id: number;
  listId: number;
  apartamentId: number;
  title: string;
  assignedUserId: number;
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