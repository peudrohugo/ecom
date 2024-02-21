import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ProductsComponent } from './products.component';
import { ProductsRoutingModule } from './products-routing.module';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [ProductsComponent],
  imports: [
    ProductsRoutingModule,
    MatCardModule,
    MatGridListModule,
    MatButtonModule,
    MatIconModule,
  ],
  providers: [],
})
export class ProductsModule {}
