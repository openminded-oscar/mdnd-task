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
    birthday: new Date()
  }
  declare petForm: FormGroup;
  declare speciesId: number;
  declare ownerId: number;

  constructor(public dataService: PetService,
              private router: Router,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.petForm = this.formBuilder.group({
      vaccinated: [this.petInitial.vaccinated, [Validators.required]],
      birthday: [this.petInitial.birthday, [Validators.required]],
    });
  }

  submit() {
    const pet = this.petForm.value;
    pet.speciesId = this.speciesId;
    pet.ownerId = this.ownerId;

    this.dataService.addItem(pet)
      .subscribe(result => {
        alert('added item');
      });
    this.router.navigate(['main'])
      .then();
  }

  speciesSelected(speciesId: number) {
    this.speciesId = speciesId;
  }

  ownerSelected(ownerId: number) {
    this.ownerId = ownerId;
  }
}
