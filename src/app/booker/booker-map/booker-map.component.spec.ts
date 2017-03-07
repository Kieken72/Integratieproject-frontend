/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BookerMapComponent } from './booker-map.component';

describe('BookerMapComponent', () => {
  let component: BookerMapComponent;
  let fixture: ComponentFixture<BookerMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookerMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookerMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
