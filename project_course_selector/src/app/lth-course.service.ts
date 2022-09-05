import { Injectable } from '@angular/core';
import { Course } from './course';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LthCourseService {
  data: any;
  course_codes: string[] = [];

  url = 'http://localhost:3000/E-COURSES';

  constructor(private http: HttpClient) {}

  getCourses(): Observable<Course[]> {
    this.fetch_data();
    console.log('Here fetched data contains: ');
    console.log(this.data);
    let courses = of(this.data);
    return courses;
  }

  getCourse(kod: string): Observable<Course> {
    return of(this.data.find((course) => course.kod === kod));
  }

  getCourseCodes(): string[] {
    return this.course_codes;
  }

  fetch_data(): void {
    this.http
      .get(this.url, { observe: 'body', responseType: 'json' })
      .subscribe((data) => {
        let correct_format = this.reformat(data);
        this.data = correct_format;
      });
  }

  reformat(data) {
    const courses = [];
    for (const courseName in data) {
      for (const courseData of data[courseName]) {
        courses.push({ ...courseData, kod: courseName });
      }
    }

    return courses;
  }
}
