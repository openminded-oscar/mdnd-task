import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AddOwnerDialogComponent } from "../../../owners/add/add.dialog.component";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: 'app-input-owner',
  templateUrl: './input-owner.component.html',
  styleUrls: ['./input-owner.component.scss']
})
export class InputOwnerComponent {
  @Output() ownerSelected = new EventEmitter<number>();

  constructor(private dialog: MatDialog) { }

  addOwner() {
    let dialogRef = this.dialog.open(AddOwnerDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      const id = result.id;
      if (id) {
        this.ownerSelected.emit(id);
      }
    });
  }
}
