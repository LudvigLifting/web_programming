import { Component, OnInit } from '@angular/core';
import { ChoiceService } from '../choice.service';
import { LthCourseService } from '../lth-course.service';
import { Course } from '../course';

@Component({
  selector: 'app-course-choice',
  templateUrl: './course-choice.component.html',
  styleUrls: ['./course-choice.component.css'],
})
export class CourseChoiceComponent implements OnInit {
  all_data: Course[] = [];

  headers = [
    'kod',
    'hp',
    'level',
    'language',
    'kursnamn',
    'spec',
    'lp1',
    'lp2',
    'lp3',
    'lp4',
    'select',
  ];

  constructor(
    private choiceService: ChoiceService,
    private lthCourseService: LthCourseService
  ) {}

  ngOnInit(): void {
    this.choiceService.clearChoices();
    this.getCourses();
  }

  getCourses(): void {
    this.lthCourseService.getCourses().subscribe((courses) => {
      this.all_data = courses;
    });
  }

  calculatePoints(): void {
    console.log(this.choiceService.find_points());
    let all_points = this.choiceService.find_points();
    let adv_points = this.choiceService.find_advanced_points();
    alert('A-level points: ' + adv_points + '\n' + 'All points: ' + all_points);
  }

  yell($event): void {
    console.log($event);
    if ($event.checked) {
      console.log('event_coursChoise' + JSON.stringify($event.source.name));
      console.log($event.source.name);

      this.all_data.map((item) => {
        if (
          item.kod === $event.source.name &&
          item.spec === $event.source.value
        ) {
          this.choiceService.addCourse(<Course>item);
        }
      });
    } else if ($event.checked == false) {
      this.all_data.map((item) => {
        if (
          item.kod === $event.source.name &&
          item.spec === $event.source.value
        ) {
          this.choiceService.removeCourse(<Course>item);
        }
      });
    }
    console.log(this.choiceService.choices);
  }
}
