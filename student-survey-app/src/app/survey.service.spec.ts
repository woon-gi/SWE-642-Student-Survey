/*
  Name: Woon-Gi Hong
  G#: G01032192
  Name: Jimmy Tran
  G#: G01130635
  Course-Section: SWE642-001
  Assignment: #3

  This file is used for unit testing the SurveyService component
*/

import { TestBed } from '@angular/core/testing';

import { SurveyService } from './survey.service';

describe('SurveyService', () => {
  let service: SurveyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SurveyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
