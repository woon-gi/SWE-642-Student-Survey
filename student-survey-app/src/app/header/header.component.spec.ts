/**
 * Name: Woon-Gi Hong
 * G#: G01032192
 * Name: Jimmy Tran
 * G#: G01130635
 * Course-Section: SWE642-001
 * Assignment: #3
 * Description: Default Unit Testing file for Header component
 **/

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
