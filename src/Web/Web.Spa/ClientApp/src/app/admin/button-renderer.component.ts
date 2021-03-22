import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-button-renderer',
  template: `
    <input type="button" value="{{label}}" type="button" data-toggle="modal"
    [attr.data-target]="modal" class="{{class}}" (click)="onClick($event)"/> `
})

export class ButtonRendererComponent implements ICellRendererAngularComp {

  params: any;
  label: string;
  class: string;
  modal: string;

  constructor() {
  }

  agInit(params): void {
    this.params = params;
    this.label = this.params.label;
    this.class = this.params.class;
    this.modal = this.params.modal;
  }

  refresh(params?: any): boolean {
    return true;
  }

  onClick($event) {
    if (this.params.onClick instanceof Function) {
      const params = {
        event: $event,
        rowData: this.params.node.data,
        label: this.label,
        modal: this.modal
      };
      this.params.onClick(params);
    }
  }
}
