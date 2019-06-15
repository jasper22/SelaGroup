import { TestBed } from '@angular/core/testing';

import { ProductsStorageService } from './products-storage.service';

describe('ProductsStorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductsStorageService = TestBed.get(ProductsStorageService);
    expect(service).toBeTruthy();
  });
});
