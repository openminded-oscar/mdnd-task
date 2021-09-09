import { Component, OnInit } from '@angular/core';
import { AddOwnerDialogComponent } from "../../../owners/add/add.dialog.component";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: 'app-input-owner',
  templateUrl: './input-owner.component.html',
  styleUrls: ['./input-owner.component.scss']
})
export class InputOwnerComponent implements OnInit {
  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  addOwner() {
    let dialogRef = this.dialog.open(AddOwnerDialogComponent);

    // dialogRef.afterClosed().subscribe(result => {
    //   if (result === 1) {
    //     const foundIndex = this.animalService.dataChange.value.findIndex((x: any) => x.id === this.id);
    //     this.animalService.dataChange.value.splice(foundIndex, 1);
    //     this.refresh();
    //   }
    // });
  }
}
