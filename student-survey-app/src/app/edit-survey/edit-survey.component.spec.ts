/*
  Name: Woon-Gi Hong
  G#: G01032192
  Name: Jimmy Tran
  G#: G01130635
  Course-Section: SWE642-001
  Assignment: #3
  This file is used for unit testing the EditSurvey component
*/

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSurveyComponent } from './edit-survey.component';

describe('EditSurveyComponent', () => {
  let component: EditSurveyComponent;
  let fixture: ComponentFixture<EditSurveyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditSurveyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
