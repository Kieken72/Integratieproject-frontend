import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone'
})
export class PhonePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(value==null){
      return value;
    }

    var value = value.toString().trim().replace(/^\+/, '');
    switch (value.length) {
      case 10: // 04XX XX XX XX
        return value.slice(0,4) + " " + value.slice(4,6) + " " + value.slice(6,8) + " " + value.slice(8,10);
      case 9: // 03 XXX XXXXX

        if(value.startsWith('02') || value.startsWith('03') || value.startsWith('09')){
          return value.slice(0,2) + " " + value.slice(2,5) + " " + value.slice(5,7) + " " + value.slice(7,9);
        } else {
          return value.slice(0,3) + " " + value.slice(3,5) + " " + value.slice(5,7) + " " + value.slice(7,9);
        }




      default:
        return value;
    }

  }
}
