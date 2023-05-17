import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  headers: HttpHeaders | undefined

  getAllUsers() {
    const httpOptions = {
      headers: new HttpHeaders({  
        authorization: 'Bearer ' + JSON.parse(sessionStorage.getItem('token') as string),
        }),
       };
       console.log(httpOptions,'token')
    return this.httpClient.get(`/api/v1/user/getAllUsers`,httpOptions);
  }

  getUserById(id:any) {
    const httpOptions = {
      headers: new HttpHeaders({  
        authorization: 'Bearer ' + JSON.parse(sessionStorage.getItem('token') as string),
        }),
       };
       return this.httpClient.get(`/api/v1/user/getUserById/${id}`,httpOptions);
  } 

  updateUser(id:any,updateObj:any) {
    const httpOptions = {
      headers: new HttpHeaders({  
        authorization: 'Bearer ' + JSON.parse(sessionStorage.getItem('token') as string),
        }),
       };
       return this.httpClient.put(`/api/v1/user/updateuser/${id}`,updateObj,httpOptions);
  }
}
