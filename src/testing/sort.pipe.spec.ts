/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { SortPipe } from '../app/shared/sort.pipe';

describe('SortPipe', () => {
  let pipe = new SortPipe();
  console.log("Sortpipe");
  it('create an instance', () => {
    const pipe = new SortPipe();
    expect(pipe).toBeTruthy();
  });

  it('empty list returns empty list', ()=>{
    expect(pipe.transform(null,'Id')).toBe(null);
  });

  it('Sort list', ()=>{
    expect(pipe.transform(['Seppe','Test','Nico'],null)).toBe(['Nico','Seppe','Test']);
  });
});
