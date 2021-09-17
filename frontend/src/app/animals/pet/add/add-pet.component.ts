import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PetService } from "../../pet.service";
import { Router } from "@angular/router";
import { Pet } from "../../../common/models/animal";
import { Species } from "../../../common/models/species";

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
  declare species: Species;
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
    pet.speciesId = this.species.id;
    pet.ownerId = this.ownerId;

    this.dataService.addItem(pet)
      .subscribe(result => {
        this.router.navigate(['main'])
          .then();
      });
  }

  speciesSelected(species: Species) {
    this.species = species;
  }

  ownerSelected(ownerId: number) {
    this.ownerId = ownerId;
  }
}
