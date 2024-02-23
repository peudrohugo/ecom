import { NgModule } from '@angular/core';
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
@NgModule({
  declarations: [ConfirmDialogComponent],
  imports: [MatDialogModule],
  exports: [ConfirmDialogComponent],
})
export class ConfirmDialogModule {}
