import { Component, OnInit } from '@angular/core';
import { SurveyService } from '../survey.service';
import { Survey } from '../survey';

@Component({
  selector: 'app-survey-list',
  templateUrl: './survey-list.component.html',
  styleUrls: ['./survey-list.component.css']
})
export class SurveyListComponent implements OnInit {
  // Array to hold the list of surveys
  surveys: Survey[] = [];

  constructor(private surveyService: SurveyService) { }

  // Initialize the component and load the surveys
  ngOnInit(): void {
    this.surveyService.getSurveys().subscribe(data => {
      this.surveys = data;
    });
  }

  // Method to delete a survey by its ID
  deleteSurvey(id: number | undefined) {
    if (id !== undefined) {
      this.surveyService.deleteSurvey(id).subscribe(() => {
        this.surveys = this.surveys.filter(survey => survey.id !== id);
      });
    } else {
      console.error('Survey ID is undefined');
    }
  }
}