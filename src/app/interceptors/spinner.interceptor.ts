import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

export const spinnerInterceptor: HttpInterceptorFn = (req, next) => {

  const _NgxSpinnerService = inject(NgxSpinnerService)
  //show loading -->req

  // if (req.url.includes('cart')) {} //! law 3awza el spinner 3la haga mo3ayana
  _NgxSpinnerService.show()

  return next(req).pipe(finalize(()=>_NgxSpinnerService.hide())) //hide loading --->res
};
