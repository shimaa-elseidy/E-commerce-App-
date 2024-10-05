import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  // cartCount:BehaviorSubject<number> = new BehaviorSubject(0);
  // ! 34an ay change ysm3 fe kol elly bya5o mno zy navbar , el zero hena init value

  cartCount:WritableSignal<number> = signal(0)

  private readonly _HttpClient = inject(HttpClient);

  // myHeaders:any={token:localStorage.getItem('userToken')}
  
  addPropductToCart(id:string):Observable<any>
  {
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/cart`,
      {
        "productId": id
      }
       //body:
      // let data = "productId": "6428ebc6dc1175abc65ca0b9"
      ,
      )
  }

  getProductCart():Observable<any>
  {
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/cart`)
  }
  deleteItm(id:string):Observable<any>
  {
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart/${id}`)
  }
  updateProduct(id:string,count:number):Observable<any>
  {
    return this._HttpClient.put(`${environment.baseUrl}/api/v1/cart/${id}`
      ,{'count':count}//!!!!!!!!!!!!!!!!!!!!!
      )
  }
  clearCart():Observable<any>
  {
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart`)
  }

}
