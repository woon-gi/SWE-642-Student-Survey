/*
  Name: Woon-Gi Hong
  G#: G01032192
  Name: Jimmy Tran
  G#: G01130635
  Course-Section: SWE642-001
  Assignment: #3
  The SurveyListComponent will display a list of existing surveys, with options to either edit or delete each selection. 
*/

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(
    private surveyService: SurveyService,
    private router: Router
  ) { }

  // Initialize the component and load the surveys
  ngOnInit(): void {
    this.surveyService.getSurveys().subscribe(data => {
      this.surveys = data;
    });
  }

  editSurvey(id: number | undefined): void {
    this.router.navigate(['/edit-survey', id]);
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