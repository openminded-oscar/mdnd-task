import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';

import {FormControl, Validators} from '@angular/forms';
import {Animal} from '../../../models/animal';
import { WildAnimalService } from "../../../services/wild-animal.service";

@Component({
  selector: 'app-add.dialog',
  templateUrl: './add.dialog.html',
  styleUrls: ['./add.dialog.css']
})

export class AddWildAnimalDialogComponent {
  constructor(public dialogRef: MatDialogRef<AddWildAnimalDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Animal,
              public dataService: WildAnimalService
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
