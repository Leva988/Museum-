import { KeyValue } from '@angular/common';

import {Observable} from 'rxjs';

export class AchievementNew {

    public id: string;

    public name: string;

    public items: KeyValue<string, Observable<string>>[];
}
