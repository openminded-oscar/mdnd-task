import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SpeciesService } from "../../animals/species.service";
import { Owner } from "../../common/models/owner";
import { OwnerService } from "../owner.service";

@Component({
  selector: 'app-add.dialog',
  templateUrl: './add.dialog.html',
  styleUrls: ['./add.dialog.css']
})

export class AddOwnerDialogComponent {
  ownerInitial: Owner = {
    fullName: undefined,
    address: {
      street: undefined,
      city: undefined,
      country: undefined,
      zipCode: undefined
    }
  };

  declare ownerForm: FormGroup;

  constructor(private dialogRef: MatDialogRef<AddOwnerDialogComponent>,
              @Inject(MAT_DIALOG_DATA) private data: any,
              private formBuilder: FormBuilder,
              private ownerService: OwnerService) {
  }

  ngOnInit(): void {
    this.ownerForm = this.formBuilder.group({
      fullName: [this.ownerInitial.fullName, [Validators.required]],
      address: this.formBuilder.group({
        street: [this.ownerInitial.address.street, [Validators.required]],
        city: [this.ownerInitial.address.city, [Validators.required]],
        country: [this.ownerInitial.address.country, [Validators.required]],
        zipCode: [this.ownerInitial.address.zipCode, [Validators.required]]
      })
    });
  }

  save() {
    console.log(JSON.stringify(this.ownerForm.value));

    this.ownerService.addItem(this.ownerForm.value)
      .subscribe(res => {
        this.dialogRef.close(res);
      });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
