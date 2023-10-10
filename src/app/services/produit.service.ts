import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produit } from '../entitys/Produit';
import { RestApiService } from './rest-api.service';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  headers:any;
  data:any=localStorage.getItem("auth"); 

  constructor(private http:HttpClient,private user:RestApiService) { 
    console.log(JSON.parse(this.data).data);
    this.headers = new HttpHeaders({Authorization: 'Basic ' +JSON.parse(this.data).data})

  }


  public getProduct(){
    const headers=this.headers;
    let myProduct = this.http.get<any>("http://localhost:8094/allProduit",{headers,responseType:'text' as 'json'})
    return myProduct; 
  }

  public getProdDetaille(){
    const headers=this.headers;
    let myProdDt = this.http.get<any>("http://localhost:8094/allProdDetail",{headers,responseType:'text' as 'json'})
    return myProdDt; 
  }

  public updateProduit(data:any){
    const headers=this.headers;
    const requestOptions = {
      headers: headers, 
      responseType: 'text' as 'json'
    };
    return this.http.put("http://localhost:8094/updateProduit", data, requestOptions);
  }

  ajoutProdui(data:any){
    const headers=this.headers;
    const requestOptions = {
      headers: headers, 
      responseType: 'text' as 'json'
    };
    return this.http.post("http://localhost:8094/addProduit", data, requestOptions);
  }

  public deleteProduit(id: number): Observable<void> {
    const headers=this.headers;
    return this.http.delete<void>(`http://localhost:8094/deleteProduit/${id}`,{headers,responseType:'text' as 'json'});
  }
  

}
