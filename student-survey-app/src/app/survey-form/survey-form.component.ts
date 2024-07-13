import { Component } from '@angular/core';
import { SurveyService } from '../survey.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-survey-form',
  templateUrl: './survey-form.component.html',
  styleUrls: ['./survey-form.component.css']
})
export class SurveyFormComponent {
  // FormGroup instance to manage the survey form
  surveyForm: FormGroup;

  constructor(private fb: FormBuilder, private surveyService: SurveyService) {
    // Initialize the survey form with form controls
    this.surveyForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      streetAddress: [''],
      city: [''],
      state: [''],
      zip: [''],
      telephoneNumber: [''],
      email: [''],
      dateOfSurvey: [''],
      likedMost: this.fb.array([]),
      interestedBy: [''],
      likelihoodToRecommend: [''],
      additionalComments: ['']
    });
  }

  // Method to handle form submission
  onSubmit() {
    this.surveyService.createSurvey(this.surveyForm.value).subscribe(response => {
      console.log('Survey submitted successfully', response);
    });
  }
}