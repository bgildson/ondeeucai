import { Pipe } from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/pt-br';

@Pipe({
  name: 'timestampToDate'
})
export class TimestampToDatePipe {
  transform(timestamp: number, format: string = 'LLL') {
    moment.locale('pt-BR');
    return moment(timestamp).format(format);
  }
}
