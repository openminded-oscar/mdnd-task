import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';
import { WildAnimalService } from "../../../services/wild-animal.service";

@Component({
  selector: 'app-delete.dialog',
  templateUrl: './delete.dialog.html',
  styleUrls: ['./delete.dialog.css']
})
export class DeleteWildAnimalDialogComponent {

  constructor(public dialogRef: MatDialogRef<DeleteWildAnimalDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dataService: WildAnimalService
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    this.dataService.deleteItem(this.data.id);
  }
}
