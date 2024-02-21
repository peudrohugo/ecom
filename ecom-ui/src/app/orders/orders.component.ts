import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

export interface Order {
  description: string;
  number: number;
  total: number;
}

const ELEMENT_DATA: Order[] = [
  { number: 1, description: 'Notebook', total: 1.0079 },
  { number: 2, description: 'Nintendo Switch', total: 4.0026 },
  { number: 3, description: 'TV', total: 6.941 },
  { number: 4, description: 'Macbook Pro', total: 9.0122 },
  { number: 5, description: 'PS5 Slim Digital Edition', total: 10.811 },
  { number: 6, description: 'Steam Deck', total: 12.0107 },
];

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements AfterViewInit {
  displayedColumns: string[] = ['number', 'description', 'total'];
  dataSource = new MatTableDataSource<Order>(ELEMENT_DATA);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
