import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { SpeciesService } from "../../species.service";

@Component({
  selector: 'app-add-species',
  templateUrl: './add-species.component.html',
  styleUrls: ['./add-species.component.scss']
})
export class AddSpeciesComponent implements OnInit {
  constructor(private dialogRef: MatDialogRef<AddSpeciesComponent>,
              @Inject(MAT_DIALOG_DATA) private data: any,
              private speciesService: SpeciesService) {
  }

  ngOnInit(): void {}

  save() {
    // TODO fix
    this.dialogRef.close('test');
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
