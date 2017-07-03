import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'looparray',
})
export class LooparrayPipe implements PipeTransform {
  /**
   * Generate a loop like a for.
   */
  transform(value: number, args: string) : any {
    let res = [];
    if (args == 'outline') {
      res = Array(5-value).fill('star-outline');
    } else {
      res = Array(value).fill('star');
    }
    return res;
  }
}
