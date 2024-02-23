import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Client } from '../shared/entities/client';
import { ClientsService } from '../shared/services/clients.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
})
export class ClientsComponent implements AfterViewInit {
  displayedColumns: string[] = ['cpf', 'name', 'phone', 'email'];
  clients = new MatTableDataSource<Client>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private clientsService: ClientsService,
    private snackBar: MatSnackBar
  ) {
    this.loadClients();
  }

  ngAfterViewInit() {
    this.clients.paginator = this.paginator;
  }

  loadClients(): void {
    this.clients.data = [];
    this.clientsService.listClients().subscribe({
      next: (data: HttpResponse<Client[]>) => {
        if (data.status === 200) this.clients.data = data.body!;
      },
      error: (error: HttpErrorResponse) => {
        console.error(error.message);
        this.snackBar.open(
          'Houve um problema ao tentar listar os clientes cadastrados!',
          '',
          {
            duration: 2500,
          }
        );
      },
    });
  }
}
