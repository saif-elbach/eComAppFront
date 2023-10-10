import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  username: any;
  password: any;
  isAuth: boolean = false;

  constructor(private http: HttpClient) { }

  public login(username: string, password: string) {
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ":" + password) })
    const login = this.http.get("http://localhost:8094/login", { headers, responseType: 'text' as 'json' })
    this.username = username;
    this.password = password;
    this.isAuth = true;
    localStorage.setItem('auth',JSON.stringify({isAuth:"true",data:btoa(this.username+":"+this.password)}));
    return login
  }
  public setisAuth() {
    console.log(this.isAuth);
    this.isAuth = true;
  }



}
