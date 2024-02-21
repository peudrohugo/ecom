import { NgModule } from '@angular/core';
import { ClientsComponent } from './clients.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ClientsRoutingModule } from './clients-routing.module';

@NgModule({
  declarations: [ClientsComponent],
  imports: [ClientsRoutingModule, MatTableModule, MatPaginatorModule],
  providers: [],
})
export class ClientsModule {}
