/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { LimitPipe } from '../app/shared/limit.pipe';

describe('LimitPipe', () => {

  let pipe = new LimitPipe();
  console.log("Limitpipe")
  it('create an instance', () => {
    const pipe = new LimitPipe();
    expect(pipe).toBeTruthy();
  });

  it('List with lots of number returns 3', ()=>{
    var array = [1,2,3,4,5,6];
    expect(pipe.transform(array)).toEqual(array.slice(0,5));
  });

  it('Sort list', ()=>{
    var array = [1,2,3,4,5,6];
    expect(pipe.transform(array,2)).toEqual(array.slice(0,2));
  });
});
