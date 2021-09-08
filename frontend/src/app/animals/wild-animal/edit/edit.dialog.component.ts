import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { WildAnimalService } from "../../../services/wild-animal.service";

@Component({
  selector: 'app-edit.dialog',
  templateUrl: './edit.dialog.html',
  styleUrls: ['./edit.dialog.css']
})
export class EditWildAnimalDialogComponent {

  constructor(public dialogRef: MatDialogRef<EditWildAnimalDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dataService: WildAnimalService
  ) { }

  formControl = new FormControl('', [
    Validators.required
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  submit(form: NgForm) {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  stopEdit(): void {
    this.dataService.updateItem(this.data);
  }
}
