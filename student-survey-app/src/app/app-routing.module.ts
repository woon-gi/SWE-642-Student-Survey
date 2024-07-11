import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SurveyFormComponent } from './survey-form/survey-form.component';
import { SurveyListComponent } from './survey-list/survey-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/survey-form', pathMatch: 'full' },
  { path: 'survey-form', component: SurveyFormComponent },
  { path: 'survey-list', component: SurveyListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
