import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private readonly _HttpClient = inject(HttpClient);

  checkout(idCart:string|null,shippingDetails:object):Observable<any>
  {
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/orders/checkout-session/${idCart}?url=http://localhost:4200/`,
      {
        'shippingAddress': shippingDetails
      },
    )
  }
  getAllOrders(idCart:string|null):Observable<any>
  {
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/orders/user/${idCart}`,
    )
  }
  CashOrders(idCart:string|null ,shippingDetails:object):Observable<any>
  {
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/orders/${idCart}`,{'shippingAddress':shippingDetails})
  }

}