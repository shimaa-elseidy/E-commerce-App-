import { HttpInterceptorFn } from '@angular/common/http';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {
  
  
if (req.url.includes('cart') || req.url.includes('orders') || req.url.includes('wishlist')) {
  if (typeof window !== 'undefined' && localStorage.getItem('userToken') !== null) {
    req = req.clone ( 
      {setHeaders : { token : localStorage.getItem('userToken')!}}
                    )
  }
}

  return next(req);//!ressponse
};
