import { Component, OnInit } from '@angular/core';
import { Course } from '../course';
import { LthCourseService } from '../lth-course.service';
import { ChoiceService } from '../choice.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  list_data: Course[] = [];
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
  ];

  level = this.list_data.map((x) => x['level']);

  constructor(
    private lthCourseService: LthCourseService,
    private choiceService: ChoiceService
  ) {}

  ngOnInit(): void {
    this.getCourse();
    this.choiceService.clearChoices();
  }

  search1($event) {
    var re = $event.target.name.kod;

    this.list_data.filter((item) => {
      if (item.kod === re) {
        console.log('Does not contain Apples');
        alert(String('Does not contain Apples'));
      } else {
        console.log('Contains Apples');
        alert(String('Contains Apples'));
      }
    });
  }

  getCourse(): void {
    this.lthCourseService
      .getCourses()
      .subscribe((list_data) => (this.list_data = list_data));
  }
}
