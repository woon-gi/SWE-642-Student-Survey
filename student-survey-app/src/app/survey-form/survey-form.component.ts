import { Component, OnInit } from '@angular/core';
import { SurveyService } from '../survey.service';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-survey-form',
  templateUrl: './survey-form.component.html',
  styleUrls: ['./survey-form.component.css']
})
export class SurveyFormComponent implements OnInit {
  surveyForm: FormGroup = this.fb.group({});
  successMessage: string = '';
  likedMostOptions: string[] = ['Students', 'Location', 'Campus', 'Atmosphere', 'Dorm Rooms', 'Sports'];

  constructor(private fb: FormBuilder, private surveyService: SurveyService, private router: Router) {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.initializeCheckboxes();
  }

  initializeForm() {
    this.surveyForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      streetAddress: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
      telephoneNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dateOfSurvey: ['', Validators.required],
      likedMost: this.fb.array([]),
      interestedBy: ['', Validators.required],
      likelihoodToRecommend: ['', Validators.required],
      additionalComments: ['']
    });
  }

  initializeCheckboxes() {
    const likedMostArray = this.surveyForm.get('likedMost') as FormArray;
    this.likedMostOptions.forEach(() => likedMostArray.push(new FormControl(false)));
  }

  get likedMostArray(): FormArray {
    return this.surveyForm.get('likedMost') as FormArray;
  }

  onSubmit() {
    if (this.surveyForm.valid) {
      const formData = { ...this.surveyForm.value };
      formData.likedMost = formData.likedMost
        .map((checked: boolean, index: number) => checked ? this.likedMostOptions[index] : null)
        .filter((value: string | null) => value !== null);

      this.surveyService.createSurvey(formData).subscribe({
        next: () => {
          this.successMessage = 'Form submitted successfully!';
          this.surveyForm.reset();
          this.clearFormArray(this.likedMostArray);
          this.initializeCheckboxes();
          setTimeout(() => {
            this.successMessage = '';
          }, 3000);
        },
        error: (err) => console.error('Error submitting form:', err)
      });
    }
  }

  cancel() {
    this.router.navigate(['/welcome']);
  }

  clearFormArray(formArray: FormArray) {
    while (formArray.length !== 0) {
      formArray.removeAt(0);
    }
  }
}