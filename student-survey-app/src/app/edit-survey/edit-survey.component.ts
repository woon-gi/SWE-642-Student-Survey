/*
  Name: Woon-Gi Hong
  G#: G01032192
  Name: Jimmy Tran
  G#: G01130635
  Course-Section: SWE642-001
  Assignment: #3
  The EditSurveyComponent will allow the user to load survey data by ID. The survey forms will be pre-populated by the survey object.
  The component also uses form control and validators to ensure all required fields are filled out prior to submission.
*/
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SurveyService } from '../survey.service';
import { DatePipe } from '@angular/common';
import { Survey } from '../survey';

@Component({
  selector: 'app-edit-survey',
  templateUrl: './edit-survey.component.html',
  styleUrls: ['./edit-survey.component.css'],
  providers: [DatePipe]  
})
export class EditSurveyComponent implements OnInit {
  surveyForm!: FormGroup;
  surveyId!: number;  // Store the survey ID
  successMessage: string = '';
  likedMostOptions: string[];  // Array of options for the "Liked Most" checkboxes
  interestedByOptions: string[]; // Similarly for radio buttons, if needed
  validationErrors: string[] = [];
  isValidationError: boolean = false;
  showModal: boolean = false;
  formSubmitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private surveyService: SurveyService,
    private datePipe: DatePipe 
  ) {
    this.likedMostOptions = ['Students', 'Location', 'Campus', 'Atmosphere', 'Dorm Rooms', 'Sports'];
    this.interestedByOptions = ['Friends', 'Television', 'Internet', 'Other'];
  }

  ngOnInit(): void {
    this.surveyId = Number(this.route.snapshot.paramMap.get('id'));
    this.surveyService.getSurvey(this.surveyId).subscribe({
      next: (survey) => this.initializeForm(survey),
      error: (err) => console.error('Error fetching survey:', err)
    });
  }

  initializeForm(survey: Survey): void {
    const likedMostArray = this.likedMostOptions.map(option =>
      survey.likedMost.map(item => item.toLowerCase()).includes(option.toLowerCase())
    );

    const interestedBy = survey.interestedBy.charAt(0).toUpperCase() + survey.interestedBy.slice(1).toLowerCase();

    this.surveyForm = this.fb.group({
      firstName: [survey.firstName, Validators.required],
      lastName: [survey.lastName, Validators.required],
      streetAddress: [survey.streetAddress, Validators.required],
      city: [survey.city, Validators.required],
      state: [survey.state, Validators.required],
      zip: [survey.zip, Validators.required],
      telephoneNumber: [survey.telephoneNumber, Validators.required],
      email: [survey.email, [Validators.required, Validators.email]],
      dateOfSurvey: [this.datePipe.transform(survey.dateOfSurvey, 'yyyy-MM-dd'), Validators.required],
      likedMost: this.fb.array(likedMostArray),
      interestedBy: [interestedBy],
      likelihoodToRecommend: [survey.likelihoodToRecommend],
      additionalComments: [survey.additionalComments]
    });
  }

  onSubmit(): void {
    this.formSubmitted = true;

    if (this.surveyForm.valid) {
      const formValue = this.surveyForm.value;
      formValue.likedMost = this.likedMostOptions.filter((option, index) => (this.surveyForm.get('likedMost') as FormArray).at(index).value);

      this.surveyService.updateSurvey(this.surveyId, this.surveyForm.value).subscribe({
        next: () => {
          this.successMessage = 'Survey updated successfully!';
          this.isValidationError = false;
          this.showModal = true;
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
}