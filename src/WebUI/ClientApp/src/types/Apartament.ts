import { IModuleDto } from './Module';

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
