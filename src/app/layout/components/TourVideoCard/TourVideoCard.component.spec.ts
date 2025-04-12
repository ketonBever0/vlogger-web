/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TourVideoCardComponent } from './TourVideoCard.component';

describe('TourVideoCardComponent', () => {
  let component: TourVideoCardComponent;
  let fixture: ComponentFixture<TourVideoCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TourVideoCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TourVideoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
