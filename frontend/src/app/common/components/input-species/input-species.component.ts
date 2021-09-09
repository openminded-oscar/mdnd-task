import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AddSpeciesComponent } from "../../../animals/species/add/add-species.component";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: 'app-input-species',
  templateUrl: './input-species.component.html',
  styleUrls: ['./input-species.component.scss']
})
export class InputSpeciesComponent {
  @Output() speciesSelected = new EventEmitter<number>();

  constructor(private dialog: MatDialog) {
  }

  addSpecies() {
    let dialogRef = this.dialog.open(AddSpeciesComponent);

    dialogRef.afterClosed().subscribe(result => {
      const id = result.id;
      if (id) {
        this.speciesSelected.emit(id);
      }
    });
  }
}
