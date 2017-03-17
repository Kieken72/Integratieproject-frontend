import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortDesc'
})
export class SortDescPipe implements PipeTransform {

  transform(array: Array<string>, args: string): Array<string> {
    if(!array){
      return array;
    }

    if(!args){
      array.sort((a: any, b: any) => {
        if ( a > b ){
          return -1;
        }else if( a < b ){
          return 1;
        }else{
          return 0;
        }
      });
      return array;
    }
    array.sort((a: any, b: any) => {
      if ( a[args] > b[args] ){
        return -1;
      }else if( a[args] < b[args] ){
        return 1;
      }else{
        return 0;
      }
    });
    return array;

}
}
