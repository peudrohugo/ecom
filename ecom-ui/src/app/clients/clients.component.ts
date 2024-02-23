import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Client } from '../shared/entities/client';
import { ClientsService } from '../shared/services/clients.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { NewClientDialogComponent } from './new-client/new-client-dialog.component';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
})
export class ClientsComponent implements AfterViewInit {
  displayedColumns: string[] = ['cpf', 'name', 'phone', 'email', 'actions'];
  clients = new MatTableDataSource<Client>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private clientsService: ClientsService,
    private dialog: MatDialog,
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

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(NewClientDialogComponent, {
      disableClose: true,
      height: '350px',
      width: '550px',
      data: {
        client: {},
        toCreate: false,
      },
    });

    dialogRef
      .afterClosed()
      .subscribe((data: { client: Client; toCreate: boolean }) => {
        if (data) {
          if (data.toCreate) {
            this.create(data.client);
          }
        }
      });
  }

  create(clientObj: Client): void {
    this.clientsService.createProduct(clientObj).subscribe({
      next: (data: HttpResponse<Client>) => {
        if (data.status === 201) {
          this.snackBar.open('Cliente cadastrado com sucesso!', '', {
            duration: 2500,
          });
          this.loadClients();
        }
      },
      error: (error: HttpErrorResponse) => {
        console.error(error.message);
        this.snackBar.open(
          'Houve um problema ao tentar cadastrar o cliente!',
          '',
          {
            duration: 2500,
          }
        );
      },
    });
  }

  delete(id: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Remover cliente?',
        message: 'Tem certeza que deseja excluir esse cliente?',
      },
    });

    dialogRef.afterClosed().subscribe((toDelete: boolean) => {
      if (toDelete) {
        this.clientsService.deleteClient(id).subscribe({
          next: (data: HttpResponse<any>) => {
            if (data.status === 200) {
              this.snackBar.open('Cliente removido com sucesso!', '', {
                duration: 2500,
              });
            }
            this.loadClients();
          },
          error: (error: HttpErrorResponse) => console.error(error.message),
        });
      }
    });
  }

  formatValue(value: string, type: string): string {
    let formattedValue: string = '';
    if (type === 'cpf')
      formattedValue = value.replace(
        /(\d{3})(\d{3})(\d{3})(\d{2})/,
        '$1.$2.$3-$4'
      );
    if (type === 'phone')
      formattedValue = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1)$2-$3');
    return formattedValue;
  }
}
