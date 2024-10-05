import { CanDeactivateFn } from '@angular/router';

export const registerGuard: CanDeactivateFn<any> = (component, currentRoute, currentState, nextState) => {
  return component.confirmChanges();
};
