/**
 * Name: Woon-Gi Hong
 * G#: G01032192
 * Name: Jimmy Tran
 * G#: G01130635
 * Course-Section: SWE642-001
 * Assignment: #3
 * Description: Default Unit Testing file for Welcome component
 **/

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeComponent } from './welcome.component';

describe('WelcomeComponent', () => {
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WelcomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
