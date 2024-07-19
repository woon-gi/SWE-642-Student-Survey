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
  validationErrors: string[] = [];
  isValidationError: boolean = false;
  showModal: boolean = false;
  formSubmitted: boolean = false;

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
      interestedBy: [''],
      likelihoodToRecommend: [''],
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
    this.formSubmitted = true;

    if (this.surveyForm.valid) {
      const formData = { ...this.surveyForm.value };
      formData.likedMost = formData.likedMost
        .map((checked: boolean, index: number) => checked ? this.likedMostOptions[index] : null)
        .filter((value: string | null) => value !== null);

      this.surveyService.createSurvey(formData).subscribe({
        next: () => {
          this.successMessage = 'Form submitted successfully!';
          this.isValidationError = false;
          this.validationErrors = [];
          this.showModal = true;
          this.surveyForm.reset();
          this.clearFormArray(this.likedMostArray);
          this.initializeCheckboxes();
          this.formSubmitted = false;
        },
        error: (err) => {
          console.error('Error submitting form:', err);
          this.validationErrors = ['An error occurred while submitting the form. Please try again.'];
          this.isValidationError = true;
          this.openModal();
        }
      });
    } else {
      console.error('Invalid form!');
      this.showValidationErrors();
      this.isValidationError = true;
      this.openModal();
    }
  }

  showValidationErrors() {
    this.validationErrors = [];
    Object.keys(this.surveyForm.controls).forEach(key => {
      const controlErrors = this.surveyForm.get(key)?.errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          if (keyError === 'required') {
            this.validationErrors.push(`${this.formatFieldName(key)} is required.`);
          }
        });
      }
    });
  }

  formatFieldName(fieldName: string): string {
    return fieldName.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  returnToHome() {
    this.router.navigate(['/welcome']);
  }

  refreshForm() {
    this.surveyForm.reset();
    this.formSubmitted = false;
    this.successMessage = '';
    this.showModal = false;
    this.isValidationError = false;
    this.clearFormArray(this.likedMostArray);
    this.initializeCheckboxes();
  }

  clearFormArray(formArray: FormArray) {
    while (formArray.length !== 0) {
      formArray.removeAt(0);
    }
  }
}