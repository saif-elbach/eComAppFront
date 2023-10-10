import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RestApiService } from './rest-api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepenceService {

  headers:any;
  data:any=localStorage.getItem("auth"); 

  constructor(private http:HttpClient,private user:RestApiService) { 
    this.headers = new HttpHeaders({Authorization: 'Basic ' +JSON.parse(this.data).data})

  }

  public getDepence(){
    const headers=this.headers;

    let myDepence = this.http.get<any>("http://localhost:8094/allDepenceInfo",{headers,responseType:'text' as 'json'})
    return myDepence;
  }

  public ajoutDepence(data:any){    
    const headers=this.headers;
    const requestOptions = {
      headers: headers, 
      responseType: 'text' as 'json'
    };

    return this.http.post("http://localhost:8094/addDepenceInfo", data, requestOptions);
  }

  public updateDepence(data:any){
    const headers=this.headers;
    const requestOptions = {
      headers: headers, 
      responseType: 'text' as 'json'
    };

    return this.http.put("http://localhost:8094/updateDepenceInfo", data, requestOptions);
  }

  public deleteDepence(id: number): Observable<void> {
    const headers = this.headers;
    return this.http.delete<void>(`http://localhost:8094/deleteDepenceInfo/${id}`, { headers, responseType: 'text' as 'json' });
  }

}
