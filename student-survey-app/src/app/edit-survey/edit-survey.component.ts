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
          this.formSubmitted = false;
          setTimeout(() => {
            this.successMessage = '';
            this.router.navigate(['/list-surveys']);
          }, 3000);
        },
        error: (err) => console.error('Error updating survey:', err)
      });
    } else {
      this.validateAllFormFields(this.surveyForm);
      this.showValidationErrors();
      this.openModal();
    }
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      } else if (control instanceof FormArray) {
        control.controls.forEach(ctrl => {
          if (ctrl instanceof FormGroup) {
            this.validateAllFormFields(ctrl);
          }
          if (ctrl instanceof FormControl) {
            ctrl.markAsTouched({ onlySelf: true });
          }
        });
      }
    });
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

  cancel(): void {
    this.router.navigate(['/list-surveys']);
  }
}