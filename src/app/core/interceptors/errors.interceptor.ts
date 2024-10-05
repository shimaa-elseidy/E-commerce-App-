import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorsInterceptor: HttpInterceptorFn = (req, next) => {
  
  const _ToastrService = inject(ToastrService);

  //!el err bygy m3a el response
  return next(req).pipe(catchError((err)=>{
    //logic-errors
    console.log('interceptor',err.error.message);
    //hena ha3rd el message fe toster
    _ToastrService.error(err.error.message)


    return throwError( ()=>err );
  }))
};
