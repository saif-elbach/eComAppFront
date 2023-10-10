import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestApiService } from 'src/app/services/rest-api.service';

@Component({
  selector: 'app-login-caisse',
  templateUrl: './login-caisse.component.html',
  styleUrls: ['./login-caisse.component.css']
})
export class LoginCaisseComponent {

  password:any;
  message:any;
  validate:any
  notValidate:any;
constructor(private restapi:RestApiService,private router:Router,private authService:RestApiService  ){}
doLogin(){
  let mdp = '99012';
  if(this.password == mdp){
    this.router.navigate(["/app-caisse"]);
  }
  else
  console.log(' unauthorized ');
}

  ngOnInit(){



 }
}
