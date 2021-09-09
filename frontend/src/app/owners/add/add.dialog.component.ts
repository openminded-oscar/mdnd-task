import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SpeciesService } from "../../animals/species.service";
import { Owner } from "../../common/models/owner";

@Component({
  selector: 'app-add.dialog',
  templateUrl: './add.dialog.html',
  styleUrls: ['./add.dialog.css']
})

export class AddOwnerDialogComponent {
  ownerInitial: Owner = {
    fullName: undefined
  };

  declare ownerForm: FormGroup;

  constructor(private dialogRef: MatDialogRef<AddOwnerDialogComponent>,
              @Inject(MAT_DIALOG_DATA) private data: any,
              private formBuilder: FormBuilder,
              private speciesService: SpeciesService) {
  }

  ngOnInit(): void {
    this.ownerForm = this.formBuilder.group({
      label: [this.ownerInitial.fullName, [Validators.required]]
    });
  }

  save() {
    this.speciesService.addItem(this.ownerForm.value)
      .subscribe(res => {
        this.dialogRef.close(res);
      });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
