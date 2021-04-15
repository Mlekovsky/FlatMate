import { IModuleDto } from './Module';

export interface IAvailableApartament {
  id: number;
  name: string;
}

export interface IApartamentDto {
  id: number;
  name: string;
  city: string;
  address: string;
  userInApartament: number;
}

export interface IApartamentInfoDTO {
  id: number;
  shortName: string;
  city: string;
  address: string;
  currentModules: IModuleDto[];
}

export interface IApartamentModulesDto {
  currentModules: IModuleDto[];
  apartamentId: number;
}

export interface IApartamentListDto {
  apartaments: IApartamentDto[];
}

//Requests

export interface IApartamentCreateRequest {
  shortName: string;
  city: string;
  address: string;
  password: string;
}

export interface IApartamentUpdateRequest {
  apartamentId: number;
  city: string;
  shortName: string;
  address: string;
}

export interface IApartamentUpdateMoudlesRequest {
  apartamentId: number;
  modules: number[];
}

export interface IApartamentAssignUserRequest {
  apartamentId: number;
  apartamentPassword: string;
}

export interface IRemoveUserApartamentReuqest {
  apartamentId: number;
}

export interface IDeleteApartamentRequest {
  apartamentId: number;
}

export interface IGetApartamentListRequest {
  order: SortingOrder;
  searchField: string;
}

export enum SortingOrder {
  Ascending = 0,
  Descending = 1,
}
