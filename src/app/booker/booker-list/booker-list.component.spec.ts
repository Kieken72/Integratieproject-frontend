/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BookerListComponent } from './booker-list.component';

describe('BookerListComponent', () => {
  let component: BookerListComponent;
  let fixture: ComponentFixture<BookerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookerListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
