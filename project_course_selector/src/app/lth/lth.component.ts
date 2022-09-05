import { Component, OnInit } from '@angular/core';
import { Course } from '../course';
import { LthCourseService } from '../lth-course.service';

@Component({
  selector: 'app-lth',
  templateUrl: './lth.component.html',
  styleUrls: ['./lth.component.css'],
})
export class LthComponent implements OnInit {
  selectedCourse?: Course;

  list_data: Course[] = [];

  headers = ['kod', 'hp', 'level', 'language', 'kursnamn'];

  level = this.list_data.map((x) => x['level']);

  yell(e) {
    if (e.target.checked) {
      //deraskod.add(e.target.name)
    } else if (e.target.checked == false) {
      //deraskod.remove(e.target.name)
    }
    console.log(e.target.name);
  }
  changeSelection(x) {
    console.log(x.checked);
  }

  constructor(private lthCourseService: LthCourseService) {}

  ngOnInit(): void {
    this.getCourse();
  }

  onSelect(course: Course): void {
    this.selectedCourse = course;
  }

  getCourse(): void {
    this.lthCourseService
      .getCourses()
      .subscribe((list_data) => (this.list_data = list_data));
    console.log('list_data' + JSON.stringify(this.list_data));
  }
}
