import { KeyValue } from '@angular/common';

import {Observable} from 'rxjs';

export class ProductionNew {

    id: string;

    name: string;

    items: KeyValue<string, Observable<string>>[];
}
