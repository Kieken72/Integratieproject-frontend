/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { DefaultPipe } from '../app/shared/default.pipe';

describe('DefaultPipe', () => {
  let pipe = new DefaultPipe();
  console.log("Defaultpipe");

  it('create an instance', () => {
    const pipe = new DefaultPipe();
    expect(pipe).toBeTruthy();
  });

  it('Default pipe expects null to be default value',()=>{
    expect(pipe.transform(null,"Nothing")).toBe("Nothing");
  });

  it('Default pipe expects not null to be the value',()=>{
    expect(pipe.transform("Something","Nothing")).toBe("Something");
  });
});
