import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { blankGaurdGuard } from './blank-gaurd.guard';

describe('blankGaurdGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => blankGaurdGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
