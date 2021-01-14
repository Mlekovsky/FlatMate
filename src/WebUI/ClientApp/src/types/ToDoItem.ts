export interface IToDoItem{
    id: number;
    listId: number;
    title: string;
    done: boolean;
    priority: number;
    note: string;
}

export interface ITodoList{
    id: number;
    title: string;
    items: IToDoItem[];
}