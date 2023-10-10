import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { RestApiService } from './rest-api.service';

@Injectable({
  providedIn: 'root'
})
export class CaisseService implements OnInit{
  headers:any;
  data:any=localStorage.getItem("auth"); 

  constructor(private http:HttpClient,private user:RestApiService) { 
    this.headers = new HttpHeaders({Authorization: 'Basic ' +JSON.parse(this.data).data})

  }


  public getCaisse(){
    const headers=this.headers;

    let myCaisse = this.http.get<any>("http://localhost:8094/allCaisseInfo",{headers,responseType:'text' as 'json'})
    console.log(myCaisse)
    return myCaisse;
  }

  public updateCaisse(data:any){
    const headers=this.headers;
    const requestOptions = {
      headers: headers, 
      responseType: 'text' as 'json'
    };

    return this.http.put("http://localhost:8094/updateCaisseInfo", data, requestOptions);
  }

  ajoutCaisse(data:any){
    const headers=this.headers;
    const requestOptions = {
      headers: headers, 
      responseType: 'text' as 'json'
    };

    return this.http.post("http://localhost:8094/addCaisseInfo", data, requestOptions);
  }

  public deleteCaisse(id: number): Observable<void> {
    const headers=this.headers;

    return this.http.delete<void>(`http://localhost:8094/deleteCaisseInfo/${id}`,{headers,responseType:'text' as 'json'});
  }


  ngOnInit() {
    
  }
}
