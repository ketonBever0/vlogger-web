/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { TourVideoService } from './tour-video.service';

describe('Service: TourVideo', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TourVideoService]
    });
  });

  it('should ...', inject([TourVideoService], (service: TourVideoService) => {
    expect(service).toBeTruthy();
  }));
});
