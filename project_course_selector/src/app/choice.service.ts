import { Injectable } from '@angular/core';
import { Course } from './course';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChoiceService {
  // Array containing choices made
  choices: Course[] = [];
  courses: Course[] = [];

  constructor() {}

  addCourse(course_object: Course): void {
    if (!this.choices.includes(course_object)) {
      this.choices.push(course_object);
    }
  }

  removeCourse(course_object: Course): void {
    if (this.choices.includes(course_object)) {
      this.choices.splice(this.choices.indexOf(course_object), 1);
    }
  }

  find_advanced_points(): Number {
    let advanced_courses: Course[] = [];
    advanced_courses = this.choices.filter((course) => course.level === 'A');
    let points = advanced_courses.reduce(
      (accumulator, currentValue) => accumulator + Number(currentValue.hp),
      0
    );

    return points;
  }

  find_points(): Number {
    let points = this.choices.reduce(
      (accumulator, currentValue) => accumulator + Number(currentValue.hp),
      0
    );
    return points;
  }

  find_current_spec(): String[] {
    // Storing in map with spec -> accumulated points as key-value
    let possible_spec: any = {};
    let final_spec: String[] = []; // Can be more than one depending on choices
    let greatest_value = 0;

    // Note, only checking points, not advanced/G2
    this.choices.map((item) => {
      if (!Object.keys(possible_spec).includes(item.spec)) {
        possible_spec = { ...possible_spec, [item.spec]: 0 };
      }
      possible_spec[item.spec] = possible_spec[item.spec] + item.hp;
      console.log(possible_spec);
    });

    // Inte snyggt men hittade ingen lämpl. funktion hatar objektliteraler
    let value: number;
    Object.keys(possible_spec).map((item) => {
      value = possible_spec[item];

      if (value === greatest_value) {
        final_spec.push(item);
      } else if (value > greatest_value) {
        final_spec = [];
        final_spec.push(item);
        greatest_value = value;
      }
    });

    return final_spec;
  }

  check_if_done(): String {
    let result: String;
    let ap = this.find_advanced_points();
    let p = this.find_points();

    let conditions = [ap >= new Number('45'), p >= new Number('90')];
    if (!conditions.includes(false)) {
      result =
        'You can graduate with spec.: ' + this.find_current_spec().join(', ');
    } else if (conditions[0] === false) {
      result = "You don't have enough advanced points.";
    } else {
      result = "You don't have enough total points.";
    }

    return result;
  }

  getChoices(): Course[] {
    return this.choices;
  }

  clearChoices() {
    this.choices = [];
  }

  find_courses_by_spec(spec: String): Course[] {
    let found: Course[] = [];

    this.courses.map((course) => {
      if (course.spec === spec) {
        found.push(course);
      }
    });

    return found;
  }

  find_courses_by_period(period: string) {
    let found: Course[] = [];

    this.courses.map((course) => {
      if (course[period] === 1) {
        found.push(course);
      }
    });

    return found;
  }

  find_courses_by_level(level: string) {
    let found: Course[] = [];

    this.courses.map((course) => {
      if (course[level] === 1) {
        found.push(course);
      }
    });

    return found;
  }
}
