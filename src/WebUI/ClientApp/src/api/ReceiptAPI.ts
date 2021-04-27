import { DeleteRequest, PostRequest, PutRequest, Request } from './base/Requests';
import { IResponse } from './base/Responses';
import { BaseAPI } from './base/BaseAPI';
import { ReceiptsUrl, ReceiptPositionsUrl } from './base/EndpointsAPI';
import { ICreateReceiptPositionRequest, ICreateReceiptRequest, IDeleteReceiptPositionRequest, IDeleteReceiptRequest, IUpdateReceiptPositionRequest, IUpdateReceiptRequest, IUpdateReceiptStatusRequest, ReceiptFilterMode } from '../types/Receipt';

/** Klasa API do modułu paragonów */
class ReceiptAPI extends BaseAPI {
  //RECEIPTS
  public async getReceipts(token: string, apartamentId: number, filterMode: ReceiptFilterMode): Promise<IResponse<any>> {
    return await super.get<any>(
      new Request({
        url: ReceiptsUrl,
        querySearchParams: { apartamentId: apartamentId, mode: filterMode },
        headers: { Authorization: 'Bearer ' + token },
      }),
    );
  }

  public async createReceipt(item: ICreateReceiptRequest, token: string): Promise<IResponse<any>> {
    return await super.post<any>(
      new PostRequest(
        {
          url: ReceiptsUrl + '/Create',
          body: JSON.stringify({
            title: item.title,
            apartamentId: item.apartamentId,
            paidBy: item.paidBy,
            date: item.date
          }),
        },
        { Authorization: 'Bearer ' + token },
      ),
    );
  }

  public async deleteReceipt(item: IDeleteReceiptRequest, token: string): Promise<IResponse<any>> {
    return await super.post<any>(
      new DeleteRequest(
        {
          url: ReceiptsUrl,
          body: JSON.stringify({
            apartamentId: item.apartamentId,
            receiptId: item.receiptId,
          }),
        },
        { Authorization: 'Bearer ' + token },
      ),
    );
  }

  public async updateReceipt(item: IUpdateReceiptRequest, token: string): Promise<IResponse<any>> {
    return await super.post<any>(
      new PostRequest(
        {
          url: ReceiptsUrl + '/Update',
          body: JSON.stringify({
            receiptId: item.receiptId,
            title: item.title,
            apartamentId: item.apartamentId,
            paidBy: item.paidBy,
            date: item.date
          }),
        },
        { Authorization: 'Bearer ' + token },
      ),
    );
  }

  public async updateReceiptStatus(item: IUpdateReceiptStatusRequest, token: string): Promise<IResponse<any>> {
    return await super.post<any>(
      new PostRequest(
        {
          url: ReceiptsUrl + '/UpdateStatus',
          body: JSON.stringify({
            receiptId: item.receiptId,
            apartamentId: item.apartamentId,
            paid: item.paid
          }),
        },
        { Authorization: 'Bearer ' + token },
      ),
    );
  }

  //RECEIPT POSITIONS
  public async createReceiptPosition(item: ICreateReceiptPositionRequest, token: string): Promise<IResponse<any>> {
    return await super.post<any>(
      new PostRequest(
        {
          url: ReceiptPositionsUrl + '/Create',
          body: JSON.stringify({
            receiptId: item.receiptId,
            apartamentId: item.apartamentId,
            value: item.value,
            product: item.product,
            assignedUsersId: item.assignedUsersId
          }),
        },
        { Authorization: 'Bearer ' + token },
      ),
    );
  }

  public async updateReceiptPosition(item: IUpdateReceiptPositionRequest, token: string): Promise<IResponse<any>> {
    return await super.post<any>(
      new PostRequest(
        {
          url: ReceiptPositionsUrl + '/Update',
          body: JSON.stringify({
            id: item.id,
            apartamentId: item.apartamentId,
            value: item.value,
            product: item.product,
            assignedUsersId: item.assignedUsersId
          }),
        },
        { Authorization: 'Bearer ' + token },
      ),
    );
  }

  public async deleteReceiptPosition(item: IDeleteReceiptPositionRequest, token: string): Promise<IResponse<any>> {
    return await super.post<any>(
      new DeleteRequest(
        {
          url: ReceiptPositionsUrl,
          body: JSON.stringify({
            apartamentId: item.apartamentId,
            id: item.id,
          }),
        },
        { Authorization: 'Bearer ' + token },
      ),
    );
  }
}

export const ReceiptsAPI = new ReceiptAPI();
