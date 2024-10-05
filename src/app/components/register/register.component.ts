import { registerGuard } from '../../core/gaurds/register.guard';
import { Component, inject } from '@angular/core';
import { AuthServiceService } from '../../core/services/auth-service.service';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass} from '@angular/common';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
private _AuthServiceService = inject(AuthServiceService);
private _FormBuilder = inject(FormBuilder);
private _Router = inject(Router);

disabled:boolean=true;
Loading:boolean=false;
// errMsg:string='';
resMsg:boolean=false;



registerForm:FormGroup= this._FormBuilder.group({
  name:      [null,[Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
  email:     [null,[Validators.required,Validators.email]],
  password:  [null,[Validators.required,Validators.pattern(/^\w{6,}$/)]],
  rePassword:[null],
  phone:     [null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]],
},{validators:this.repasswordValidation})


repasswordValidation(g: AbstractControl) {
    const password = g.get('password')?.value;
    const rePassword = g.get('rePassword')?.value;
    return password === rePassword ? null : { mismatch: true };
}

confirmChanges():boolean {  
  if (this.registerForm.dirty) {  
      return confirm('You have unsaved changes!,Are you sure you want to leave?')
}
else
{
    return true;//m3ml4 ay changes fa ha3deh 3ady
}
}

confirmForm(){
if (this.registerForm.valid) {
    this.Loading=true
    this._AuthServiceService.signOut(this.registerForm.value).subscribe({
    next:(res)=>{if (res.message == 'success') {
      this.Loading=false;
      this.resMsg=true;
      this.registerForm.markAsPristine();

      setTimeout(() => {
        this._Router.navigate(['./login'])
      }, 2000);

    };
    },
    error:(err:HttpErrorResponse)=>{
      // this.errMsg= err.error.message;
      this.Loading=false;
    }
    })
}}
}



