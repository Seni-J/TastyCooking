import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreaterecipePage } from './createrecipe.page';

describe('CreaterecipePage', () => {
  let component: CreaterecipePage;
  let fixture: ComponentFixture<CreaterecipePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreaterecipePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreaterecipePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
