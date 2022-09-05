import { TestBed } from '@angular/core/testing';
import { LthCourseService } from './lth-course.service';

describe('LthCourseService', () => {
  let service: LthCourseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LthCourseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
