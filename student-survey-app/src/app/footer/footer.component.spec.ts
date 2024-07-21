/**
 * Name: Woon-Gi Hong
 * G#: G01032192
 * Name: Jimmy Tran
 * G#: G01130635
 * Course-Section: SWE642-001
 * Assignment: #3
 * Description: Default Unit Testing file for Footer component
 **/

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FooterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
