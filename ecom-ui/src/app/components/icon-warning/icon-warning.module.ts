import { NgModule } from '@angular/core';
import { IconWarningComponent } from './icon-warning.component';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
@NgModule({
  declarations: [IconWarningComponent],
  imports: [CommonModule, MatIconModule],
  exports: [IconWarningComponent],
})
export class IconWarningModule {}
