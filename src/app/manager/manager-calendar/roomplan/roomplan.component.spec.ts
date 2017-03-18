/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RoomplanComponent } from './roomplan.component';

describe('RoomplanComponent', () => {
  let component: RoomplanComponent;
  let fixture: ComponentFixture<RoomplanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomplanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
