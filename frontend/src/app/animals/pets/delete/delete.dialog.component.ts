import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';
import { PetService } from "../../../services/pet.service";

@Component({
  selector: 'app-delete.dialog',
  templateUrl: './delete.dialog.html',
  styleUrls: ['./delete.dialog.css']
})
export class DeletePetDialogComponent {

  constructor(public dialogRef: MatDialogRef<DeletePetDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dataService: PetService
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    this.dataService.deleteItem(this.data.id);
  }
}
