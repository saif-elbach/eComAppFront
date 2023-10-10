import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestApiService } from 'src/app/services/rest-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  username:any;
  password:any;
  message:any;
  validate:any
  notValidate:any;
constructor(private restapi:RestApiService,private router:Router,private authService:RestApiService  ){}


  ngOnInit(): void {
    const data:any=localStorage.getItem("auth");
    if(JSON.parse(data).isAuth=="true"){
      this.authService.setisAuth();
      this.router.navigate(["/app-acceuil"]);
  
    }
    throw new Error('Method not implemented.');
  }

  doLogin(){
    this.validate=false;
    this.notValidate=false;
    this.restapi.login(this.username,this.password).subscribe(
      (response)=>{
  
        this.validate=true;
        console.log("rest api : ",response);
        console.log("validate : ",this.validate)

          setTimeout(() => {
            this.router.navigate(["/app-acceuil"]);
          }, 2000);
    },(error)=>{
      console.log("rest api : ",error);
      this.notValidate=true;
    })
  }

}
