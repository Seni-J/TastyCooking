import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditstepPage } from './editstep.page';

describe('EditstepPage', () => {
  let component: EditstepPage;
  let fixture: ComponentFixture<EditstepPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditstepPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditstepPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
