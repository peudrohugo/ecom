import { NgModule } from '@angular/core';
import { OrdersComponent } from './orders.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { OrdersRoutingModule } from './orders-routing.module';

@NgModule({
  declarations: [OrdersComponent],
  imports: [OrdersRoutingModule, MatTableModule, MatPaginatorModule],
  providers: [],
})
export class OrdersModule {}
