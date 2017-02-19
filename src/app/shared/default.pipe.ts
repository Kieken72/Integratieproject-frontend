import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'default'
})
export class DefaultPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if ( ( value === null ) && args.length ) {
      return( args );
    } else {
      return( value );
    }
  }

}
