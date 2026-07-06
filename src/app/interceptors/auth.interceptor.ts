import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {


  console.log('INTERCEPTOR HIT');
  console.log(req.url);
  const token = localStorage.getItem('token');
  console.log('Token from localStorage:', token); // Debugging line

  if (token) {

    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log('Authorization Header Added');


  }

  return next(req);
};

