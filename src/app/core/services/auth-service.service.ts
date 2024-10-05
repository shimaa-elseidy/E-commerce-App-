import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
private readonly _HttpClient=inject(HttpClient);

saveUser:any=null

signOut(data:object):Observable<any>
{
  return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/signup`,data)
}
signIn(data:object):Observable<any>
{
  return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/signin`,data)
}
saveUserToken(): string | null {
  const token = localStorage.getItem('userToken');
  if (token) {
    this.saveUser = jwtDecode(token);
    const userId = this.saveUser.id; 
    if (userId) {
      localStorage.setItem('userId', userId);
      return userId; // userId
    }
  }
  return null; // userId
}




forgotPassword(body:object):Observable<any>
{
  return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/forgotPasswords`,body)
}
sendcode(body:object):Observable<any>
{
  return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/verifyResetCode`,body)
}
resetPassword(body:object):Observable<any>
{
  return this._HttpClient.put(`${environment.baseUrl}/api/v1/auth/resetPassword`,body)
}
}
