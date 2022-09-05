import { Component, OnInit } from '@angular/core';
import { ChoiceService } from '../choice.service';

@Component({
  selector: 'app-result-display',
  templateUrl: './result-display.component.html',
  styleUrls: ['./result-display.component.css'],
})
export class ResultDisplayComponent implements OnInit {
  whichSpec: String;
  choices = this.choiceService.getChoices();
  headers = ['kod', 'hp', 'level', 'kursnamn'];

  constructor(private choiceService: ChoiceService) {}

  ngOnInit(): void {
    this.amIDone();
  }

  amIDone(): void {
    this.whichSpec = this.choiceService.check_if_done();
  }
}
