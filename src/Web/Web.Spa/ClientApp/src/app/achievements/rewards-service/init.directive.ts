import { Directive, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';


// tslint:disable-next-line: directive-selector
@Directive({selector: '[ngInit]'})
 export class InitDirective implements OnInit {
    @Output() ngInit: EventEmitter<any> = new EventEmitter();
  constructor(private templateRef: TemplateRef<any>) {  }
    ngOnInit() {
        this.ngInit.emit();
    }
}
