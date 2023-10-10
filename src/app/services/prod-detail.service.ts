import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RestApiService } from './rest-api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdDetailService {
  headers:any;
  data:any=localStorage.getItem("auth"); 

  constructor(private http:HttpClient,private user:RestApiService) { 
    this.headers = new HttpHeaders({Authorization: 'Basic ' +JSON.parse(this.data).data})
  }


  public getProdDetaille(){
    const headers=this.headers;
    let myProdDetaille = this.http.get<any>("http://localhost:8094/allProdDetail",{headers,responseType:'text' as 'json'})
    return myProdDetaille;
  }

  public updateProdDetaille(data:any){
    const headers=this.headers;
    const requestOptions = {
      headers: headers, 
      responseType: 'text' as 'json'
    };

    return this.http.put("http://localhost:8094/updateProdDetail", data, requestOptions);
  }

  ajoutProdDetaille(data:any){
    const headers=this.headers;
    const requestOptions = {
      headers: headers, 
      responseType: 'text' as 'json'
    };

    return this.http.post("http://localhost:8094/addProdDetail", data, requestOptions);
  }

  public deleteProdDetaille(id: number): Observable<void> {
    const headers=this.headers;

    return this.http.delete<void>(`http://localhost:8094/deleteProdDetail/${id}`,{headers,responseType:'text' as 'json'});
  }
}
