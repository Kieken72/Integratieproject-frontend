/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { PhonePipe } from '../app/shared/phone.pipe';

describe('PhonePipe', () => {
  let pipe = new PhonePipe();
  console.log("Phonepipe");

  it('create an instance', () => {
    const pipe = new PhonePipe();
    expect(pipe).toBeTruthy();
  });

  it('Transforms fixed phone number in formatted number',()=>{
      expect(pipe.transform("033226303")).toBe("03 322 63 03");
  });

  it('Transforms mobile phone number in formatted number',()=>{
    expect(pipe.transform("0477850494")).toBe("0477 85 04 94");
  });


});
