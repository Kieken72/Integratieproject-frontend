import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterUser'
})
export class FilterUserPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(args==null){
      return value;
    }
    return value.filter(e=>e.UserId !== args);
  }

}
