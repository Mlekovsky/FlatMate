//REQUESTS

import { IAssignableUserDto } from "./common";

//RECEIPTS

export enum ReceiptFilterMode {
    NotPaid = 0,
    Paid = 1,
    All = 2
}

export interface ICreateReceiptRequest{
    apartamentId: number;
    title: string;
    paidBy: number;
    date: Date;
}

export interface IUpdateReceiptRequest{
    receiptId: number;
    apartamentId: number;
    title: string;
    paidBy: number;
    date: Date;
}

export interface IUpdateReceiptStatusRequest{
    apartamentId: number;
    receiptId: number;
    paid: boolean;
}

export interface IDeleteReceiptRequest {
    apartamentId: number;
    receiptId: number;
}

//RECEIPTS POSITIONS

export interface ICreateReceiptPositionRequest{
    receiptId: number;
    apartamentId: number;
    value: number;
    product: string;
    assignedUsersId: number[];
}

export interface IUpdateReceiptPositionRequest{
    id: number;
    apartamentId: number;
    value: number;
    product: string;
    assignedUsersId: number[];
}

export interface IDeleteReceiptPositionRequest {
    id: number;
    apartamentId: number;
}

//DTOs
export interface IReceiptsDto {
    receipts: IReceiptListDto[];
    users: IAssignableUserDto[];
}

export interface IReceiptListDto{
    id: number;
    paid: boolean;
    date: Date;
    title: string;
    totalValue: number;
    paidByUser: IAssignableUserDto;
    userTotalValues:IUserReceiptTotalValueDto[];
    positions:IReceiptPositionDto[];
}

export interface IUserReceiptTotalValueDto{
    user: string;
    totalValue: number;
}

export interface IReceiptPositionDto{
    id: number;
    receiptId: number;
    product: string;
    value: number;
    assignedUsers: IAssignableUserDto[]
}


