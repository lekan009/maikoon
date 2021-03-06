import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Categories5Page } from './categories5.page';

describe('Categories5Page', () => {
  let component: Categories5Page;
  let fixture: ComponentFixture<Categories5Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Categories5Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Categories5Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
