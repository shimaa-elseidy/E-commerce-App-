import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthServiceService } from '../../core/services/auth-service.service';
import { NgClass } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink,NgClass],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent implements OnDestroy {
private readonly _AuthServiceService = inject(AuthServiceService);
private readonly _FormBuilder = inject(FormBuilder);
private readonly _Router = inject(Router);

step:number=1;
Loading:boolean =false;
isAlertVisible:boolean =false;
resendMsg:boolean=false;
success:boolean=false;
isCodeInvalid: string = ''; 

forgotpasswordSub!:Subscription;
sendCodeSub!:Subscription;
resetPasswordSub!:Subscription;

forgotPasswordForm:FormGroup=this._FormBuilder.group({
  email:       [null,[Validators.required,Validators.email]],
})
sendCodeForm:FormGroup=this._FormBuilder.group({
  resetCode:    [null,[Validators.required,Validators.pattern(/^[0-9]{6}$/)]],
})
resetNewPasswordForm:FormGroup=this._FormBuilder.group({
  email:        [null,[Validators.required,Validators.email]],
  newPassword:  [null,[Validators.required,Validators.pattern(/^\w{6,}$/)]],
})


forgotpassword():void{
  this.forgotPasswordForm.markAllAsTouched(); // Ensure form fields are validated
//when submit ==>get value elly gowa el email then put it form 3
this.forgotPasswordForm.get('email')?.value;//!important;
this.resetNewPasswordForm.get('email')?.patchValue(this.forgotPasswordForm.get('email')?.value)
if (this.forgotPasswordForm.valid) {
  this.Loading=true;
  this.forgotpasswordSub= this._AuthServiceService.forgotPassword(this.forgotPasswordForm.value).subscribe({
    next:(res)=>{;
      if (res.statusMsg == "success") {
        this.Loading=false
        this.isAlertVisible=true;
        setTimeout(() => {
          this.step=2;
        }, 1000);
        
      }
    },
    error:(err)=>{console.log(err);
      this.Loading=false;
    }
  })
}
}
sendCode(): void {
  this.sendCodeForm.markAllAsTouched(); // Ensure form fields are validated
  if (this.sendCodeForm.valid) {
    this.Loading = true;
    this.isCodeInvalid = ''; // Reset the error message
    this.sendCodeSub = this._AuthServiceService.sendcode(this.sendCodeForm.value).subscribe({
      next: (res) => {
        this.Loading = false;
        if (res.status === 'Success') {
          this.success = true;
          setTimeout(() => {
            this.success = false;
            this.step = 3;
          }, 3000);
        }
      },
      error: (err) => {
        this.Loading = false;
        this.isCodeInvalid = 'The entered code is invalid. Please check and try again.'; // Set error message
      }
    });
  } else {
    this.isCodeInvalid = 'Please enter a valid code.'; // Show validation error message
  }
}






resendCode(): void {    
  if (this.sendCodeForm.valid) {  
    this.Loading = true;      
    this.sendCodeSub = this._AuthServiceService.sendcode(this.sendCodeForm.value).subscribe({  
      next: (res) => {  
        this.Loading = false;  
        if (res.status === 'Success') {  
          this.success = true;  
          setTimeout(() => {   
          }, 3000);  
        }  
      },  
      error: (err) => {  
        this.Loading = false;  
        this.isCodeInvalid = 'Failed to resend the code, please try again.';  
      }  
    });  

  } else {   
    this.sendCodeForm.markAllAsTouched();  
  }  
}


resetPassword():void{
this.resetNewPasswordForm.markAllAsTouched(); // Ensure form fields are validated
if (this.resetNewPasswordForm.valid) {
  this.Loading=true;
  this.resetPasswordSub=this._AuthServiceService.resetPassword(this.resetNewPasswordForm.value).subscribe({
    next:(res)=>{;
      this.Loading=false;
      console.log(res);
      
      localStorage.setItem("userToken",res.token);
      this._AuthServiceService.saveUserToken()
      setTimeout(() => {
        this._Router.navigate(['/home'])
      }, 1000);
    },
    error:(err)=>{console.log(err);
      this.Loading=false;
    }
  })
  }
}

ngOnDestroy(): void {
    this.forgotpasswordSub?.unsubscribe();
    this.sendCodeSub?.unsubscribe();
    this.resetPasswordSub?.unsubscribe();
}

}
