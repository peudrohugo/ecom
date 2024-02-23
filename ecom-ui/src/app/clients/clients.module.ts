import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ClientsRoutingModule } from './clients-routing.module';
import { IconWarningModule } from '../components/icon-warning/icon-warning.module';

import { ClientsComponent } from './clients.component';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [ClientsComponent],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
    IconWarningModule,
  ],
  providers: [],
})
export class ClientsModule {}
