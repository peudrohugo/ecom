import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Client } from 'src/app/shared/entities/client';

@Component({
  selector: 'new-client-dialog',
  templateUrl: './new-client-dialog.component.html',
  styleUrls: ['./new-client-dialog.component.scss'],
})
export class NewClientDialogComponent {
  cpf = new FormControl('', [Validators.required]);
  name = new FormControl('', [Validators.required]);
  phone = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);

  newClientForm: FormGroup = this.formBuilder.group({
    cpf: this.cpf,
    name: this.name,
    phone: this.phone,
    email: this.email,
  });
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<NewClientDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { client: object; toCreate: boolean }
  ) {}

  close(): void {
    this.dialogRef.close();
  }

  sendToCreate(): { client: Client; toCreate: boolean } {
    return {
      client: {
        cpf: this.cpf.value!,
        name: this.name.value!,
        phone: this.phone.value!,
        email: this.email.value!,
      },
      toCreate: true,
    };
  }
}
