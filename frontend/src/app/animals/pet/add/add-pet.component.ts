import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PetService } from "../../pet.service";
import { Router } from "@angular/router";
import { Pet } from "../../../common/models/animal";
import { MatDialog } from "@angular/material/dialog";
import { DeletePetDialogComponent } from "../delete/delete.dialog.component";
import { DeleteWildAnimalDialogComponent } from "../../wild-animal/delete/delete.dialog.component";
import { AddSpeciesComponent } from "../../species/add/add-species.component";
import { AddOwnerDialogComponent } from "../../../owners/add/add.dialog.component";

@Component({
  selector: 'app-add.dialog',
  templateUrl: './add-pet.html',
  styleUrls: ['./add-pet.scss']
})
export class AddPetComponent implements OnInit {
  petInitial: Pet = {
    vaccinated: false,
    birthday: new Date(),
    speciesId: undefined
  }
  declare petForm: FormGroup

  constructor(public dataService: PetService,
              private router: Router,
              private formBuilder: FormBuilder,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.petForm = this.formBuilder.group({
      vaccinated: [this.petInitial.vaccinated, [Validators.required]],
      birthday: [this.petInitial.birthday, [Validators.required]],
    });
  }

  submit() {
    this.dataService.addItem(this.petForm.value)
      .subscribe(result => {
        alert('added item');
      });
    this.router.navigate(['main'])
      .then();
  }

  speciesSelected($event: string) {
    // TODO fix
    console.log('species selected');
  }
}
