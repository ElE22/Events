import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tuncatePipe'
})
export class TuncatePipePipe implements PipeTransform {

 transform(value: string, limit: number = 100, trail: string = '...'): string {
    return value && value.length > limit ? value.substring(0, limit) + trail : value;
  }

}
