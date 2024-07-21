/*
  Name: Woon-Gi Hong
  G#: G01032192
  Name: Jimmy Tran
  G#: G01130635
  Course-Section: SWE642-001
  Assignment: #3
  
  Sets up the routes for the application by mapping URL paths to corresponding components
*/

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { SurveyFormComponent } from './survey-form/survey-form.component';
import { SurveyListComponent } from './survey-list/survey-list.component';
import { EditSurveyComponent } from './edit-survey/edit-survey.component';

// Define routes for the application
const routes: Routes = [
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'student-survey', component: SurveyFormComponent },
  { path: 'list-surveys', component: SurveyListComponent },
  { path: 'edit-survey/:id', component: EditSurveyComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
