import { Injectable } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { LoadingComponent } from '../pages/utils/loading/loading.component';
//components

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private ref?: DynamicDialogRef;
  constructor(private dialog: DialogService) {}

  show() {
    this.ref = this.dialog.open(LoadingComponent, {
      showHeader: false,
      closeOnEscape: false,
      closable: false,
      styleClass: 'loading-dialog',
    });
  }

  close() {
    if (this.ref) this.ref.close();
    this.ref = undefined;
  }
}
