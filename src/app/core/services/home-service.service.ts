import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class HomeServiceService {

  private readonly _HttpClient = inject(HttpClient);



  //products api
  getAllProducts():Observable<any>
  {
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/products`)
  }
  getSpecificProduct(id:string|null):Observable<any>
  {
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/products/${id}`)
  }

  //-------categories api
  getAllCategories():Observable<any>
  {
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/categories`)
  }
  getBrands():Observable<any>
  {
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/brands`)
  }
}
