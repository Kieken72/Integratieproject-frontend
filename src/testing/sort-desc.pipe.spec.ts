/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { SortDescPipe } from '../app/shared/sort-desc.pipe';

describe('SortDescPipe', () => {

  let pipe = new SortDescPipe();
  console.log("Sortpipe Desc");
  it('create an instance', () => {
    const pipe = new SortDescPipe();
    expect(pipe).toBeTruthy();
  });

  it('empty list returns empty list', ()=>{
    expect(pipe.transform(null,'Id')).toBe(null);
  });

  it('Sort list', ()=>{
    expect(pipe.transform(['Seppe','Test','Nico'],null)).toEqual(['Test','Seppe','Nico']);
  });
});
