import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';

import {FormControl, Validators} from '@angular/forms';
import {Animal} from '../../common/models/animal';
import { PetService } from "../../animals/pet.service";

@Component({
  selector: 'app-add.dialog',
  templateUrl: './add.dialog.html',
  styleUrls: ['./add.dialog.css']
})

export class AddOwnerDialogComponent {
  constructor(public dialogRef: MatDialogRef<AddOwnerDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Animal,
              public dataService: PetService
  ) { }

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  submit() {
  // empty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    this.dataService.addItem(this.data);
  }
}
