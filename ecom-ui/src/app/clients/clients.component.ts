import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

export interface Client {
  name: string;
  identifier: number;
  phone: string;
  email: string;
}

const ELEMENT_DATA: Client[] = [
  {
    identifier: 1,
    name: 'Pedro Hugo',
    phone: '+55(00)00000-0000',
    email: 'example@email.com',
  },
  {
    identifier: 2,
    name: 'Laura Barboza',
    phone: '+55(00)00000-0000',
    email: 'example@email.com',
  },
  {
    identifier: 3,
    name: 'Alfredo Barboza',
    phone: '+55(00)00000-0000',
    email: 'example@email.com',
  },
  {
    identifier: 4,
    name: 'Ana Luiza',
    phone: '+55(00)00000-0000',
    email: 'example@email.com',
  },
  {
    identifier: 5,
    name: 'Harry Potter',
    phone: '+55(00)00000-0000',
    email: 'example@email.com',
  },
  {
    identifier: 6,
    name: 'Ash Ketchum',
    phone: '+55(00)00000-0000',
    email: 'example@email.com',
  },
  {
    identifier: 7,
    name: 'Gojo Satoru',
    phone: '+55(00)00000-0000',
    email: 'example@email.com',
  },
  {
    identifier: 8,
    name: 'Itadori Yuji',
    phone: '+55(00)00000-0000',
    email: 'example@email.com',
  },
  {
    identifier: 9,
    name: 'Megumi Fushiguro',
    phone: '+55(00)00000-0000',
    email: 'example@email.com',
  },
  {
    identifier: 10,
    name: 'Suguru Geto',
    phone: '+55(00)00000-0000',
    email: 'example@email.com',
  },
];

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
})
export class ClientsComponent implements AfterViewInit {
  displayedColumns: string[] = ['identifier', 'name', 'phone', 'email'];
  dataSource = new MatTableDataSource<Client>(ELEMENT_DATA);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
