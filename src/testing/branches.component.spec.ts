import { TestBed, async } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {BranchComponent} from "../branches/branches.component";


describe('BranchComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [
        BranchComponent
      ],
    });
    TestBed.compileComponents();
  });

  it(`should have as title 'Nieuw Filiaal'`, async(() => {
    const fixture = TestBed.createComponent(BranchComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Nieuw filiaal!');

  }));

  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(BranchComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Nieuw filiaal');
  }));
});
