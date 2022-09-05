import { Component, OnInit } from '@angular/core';
import { Course } from '../course';
import { ActivatedRoute } from '@angular/router';
import { LthCourseService } from '../lth-course.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css'],
})
export class CourseDetailComponent implements OnInit {
  course: Course;

  constructor(
    private route: ActivatedRoute,
    private lthCourseService: LthCourseService
  ) {}

  ngOnInit(): void {
    this.getCourse();
  }

  getCourse(): void {
    const kod = this.route.snapshot.paramMap.get('kod');
    this.lthCourseService
      .getCourse(kod)
      .subscribe((course) => (this.course = course));
  }
}
