import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SurveyService } from '../survey.service';
import { Survey } from '../survey';

@Component({
  selector: 'app-edit-survey',
  templateUrl: './edit-survey.component.html',
  styleUrls: ['./edit-survey.component.css']
})
export class EditSurveyComponent implements OnInit {
  surveyForm!: FormGroup;
  surveyId!: number;  // Store the survey ID
  likedMostOptions: string[];  // Array of options for the "Liked Most" checkboxes
  interestedByOptions: string[]; // Similarly for radio buttons, if needed

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private surveyService: SurveyService
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
    this.surveyForm = this.fb.group({
      firstName: [survey.firstName, Validators.required],
      lastName: [survey.lastName, Validators.required],
      streetAddress: [survey.streetAddress, Validators.required],
      city: [survey.city, Validators.required],
      state: [survey.state, Validators.required],
      zip: [survey.zip, Validators.required],
      telephoneNumber: [survey.telephoneNumber, Validators.required],
      email: [survey.email, [Validators.required, Validators.email]],
      dateOfSurvey: [survey.dateOfSurvey, Validators.required],
      likedMost: [survey.likedMost],
      interestedBy: [survey.interestedBy, Validators.required],
      likelihoodToRecommend: [survey.likelihoodToRecommend, Validators.required],
      additionalComments: [survey.additionalComments]
    });
  }

  onSubmit(): void {
    if (this.surveyForm.valid) {
      this.surveyService.updateSurvey(this.surveyId, this.surveyForm.value).subscribe({
        next: () => this.router.navigate(['/list-surveys']),
        error: (err) => console.error('Error updating survey:', err)
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/list-surveys']);
  }
}