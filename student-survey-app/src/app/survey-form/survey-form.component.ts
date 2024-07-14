import { Component } from '@angular/core';
import { SurveyService } from '../survey.service';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

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

  // Getter for likedMost FormArray
  get getLikedMost(): FormArray {
    return this.surveyForm.get('likedMost') as FormArray;
  }

  // Method to handle checkbox changes
  onCheckboxChange(event: any) {
    const likedMost = this.getLikedMost;

    // if checked, add new item (form control) to likedMost list
    if (event.target.checked) {
      likedMost.push(this.fb.control(event.target.value));
    } 
    // else, search through likedMost list and remove item
    // with matching value as checkbox
    else {
      const index = likedMost.controls.findIndex(x => x.value === event.target.value);
      likedMost.removeAt(index);
    }
  }

  // Method to handle form submission
  onSubmit() {
    this.surveyService.createSurvey(this.surveyForm.value).subscribe(response => {
      console.log('Survey submitted successfully', response);
    });
  }
}
