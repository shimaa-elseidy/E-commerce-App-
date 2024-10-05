import { Component, inject } from '@angular/core';
import { AuthServiceService } from '../../core/services/auth-service.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass} from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
private _AuthServiceService = inject(AuthServiceService);
private _FormBuilder = inject(FormBuilder);
private _Router = inject(Router);

disabled:boolean=true;
Loading:boolean=false;
errMsg:string='';
resMsg:boolean=false;

loginForm:FormGroup= this._FormBuilder.group({
  email:     [null,[Validators.required,Validators.email]],
  password:  [null,[Validators.required,Validators.pattern(/^\w{6,}$/)]],
})

confirmForm(){
if (this.loginForm.valid) {
    this.Loading=true
    this._AuthServiceService.signIn(this.loginForm.value).subscribe({
    next:(res)=>{if (res.message == 'success') {
      this.Loading=false;
      this.resMsg=true
      localStorage.setItem('userToken',res.token);
      //decode token with jwt (json web token);
      this._AuthServiceService.saveUserToken
      
      setTimeout(() => {
        this._Router.navigate(['./home'])
      }, 2000);

    };
    },
    error:(err:HttpErrorResponse)=>{
      this.errMsg= err.error.message;;
      this.Loading=false;
    }
    })
}


}}





