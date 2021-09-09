import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { SpeciesService } from "../../species.service";
import { Species } from "../../../common/models/species";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-add-species',
  templateUrl: './add-species.component.html',
  styleUrls: ['./add-species.component.scss']
})
export class AddSpeciesComponent implements OnInit {
  speciesInitial: Species = {
    label: undefined
  };

  declare speciesForm: FormGroup;

  constructor(private dialogRef: MatDialogRef<AddSpeciesComponent>,
              @Inject(MAT_DIALOG_DATA) private data: any,
              private formBuilder: FormBuilder,
              private speciesService: SpeciesService) {
  }

  ngOnInit(): void {
    this.speciesForm = this.formBuilder.group({
      label: [this.speciesInitial.label, [Validators.required]]
    });
  }

  save() {
    this.speciesService.addItem(this.speciesForm.value)
      .subscribe(res => {
        this.dialogRef.close(res);
      });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
