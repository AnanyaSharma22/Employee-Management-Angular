import { TestBed } from '@angular/core/testing';

import { ApitokenInterceptor } from './apitoken.interceptor';

describe('ApitokenInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ApitokenInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: ApitokenInterceptor = TestBed.inject(ApitokenInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
