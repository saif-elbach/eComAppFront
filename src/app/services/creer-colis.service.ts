import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RestApiService } from './rest-api.service';

@Injectable({
  providedIn: 'root'
})
export class CreerColisService {

  headers: any;
  data: any = localStorage.getItem("auth");

  constructor(private http: HttpClient, private user: RestApiService) {
    this.headers = new HttpHeaders({ Authorization: 'Basic ' + JSON.parse(this.data).data })

  }


  public getCreerColis() {
    const headers = this.headers;

    let myCreerColis = this.http.get<any>("http://localhost:8094/allCreerColis", { headers, responseType: 'text' as 'json' })
    return myCreerColis;
  }

  public updateCreerColis(data: any) {
    const headers = this.headers;
  
    const requestOptions = {
      headers: headers, 
      responseType: 'text' as 'json'
    };
  
    const update = this.http.put("http://localhost:8094/updateCreerColis", data, requestOptions); 
  
    return update;
  }
  
  ajoutCreerColis(data: any) {
    const headers = this.headers;
    const requestOptions = {
      headers: headers, 
      responseType: 'text' as 'json'
    };
  
    return this.http.post("http://localhost:8094/addCreerColis", data, requestOptions);
  }

  public deleteCreerColis(id: number): Observable<void> {
    const headers = this.headers;
    return this.http.delete<void>(`http://localhost:8094/deleteCreerColis/${id}`, { headers, responseType: 'text' as 'json' });
  }
}
