import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ResponseModel} from '../models/response-model';


@Injectable({
  providedIn: 'root'
})
export class AppServiceService {

  constructor(private http: HttpClient) {
  }

  mobileCheck(data: any): Observable<any> {
    // console.log(data);
    return this.http.post<ResponseModel>(`/api/auth/request-token`, data);
  }

  registerUser(data: any): Observable<any> {
    console.log(data);
    return this.http.post<ResponseModel>(`/api/auth/register-user`, data);
  }



  verifyUser(data: any): Observable<any> {
    // console.log(data);
    return this.http.post<ResponseModel>(`/api/auth/verify-token`, data);
  }

  storeMobile( mobile){
    localStorage.setItem('mobile' , mobile);
  }
  storeToken(token){
    localStorage.setItem('token', token);
  }

  isMobile(){
    return localStorage.getItem('mobile') != null ;
  }

  isLogin(){
    return localStorage.getItem('token') != null ;
  }
  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('mobile');
    return true ;
  }
}


