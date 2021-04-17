export interface IModuleDto {
  id: number;
  name: string;
}

export interface IModuleInfoDto {
  id: number;
  name: string;
  description: string;
}

export enum Modules {
  TODO_MODULE = 1,
  SHOPPING_LIST = 2
}
