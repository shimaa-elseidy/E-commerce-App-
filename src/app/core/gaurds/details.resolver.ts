import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { HomeServiceService } from '../services/home-service.service';

export const detailsResolver: ResolveFn<boolean> = (route, state) => {
  const _HomeServiceService = inject(HomeServiceService);

  return  _HomeServiceService.getSpecificProduct(route.paramMap.get('id'))


};
