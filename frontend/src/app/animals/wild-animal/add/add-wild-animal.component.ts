import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WildAnimalService } from "../../wild-animal.service";
import { Router } from "@angular/router";
import { WildAnimal } from "../../../common/models/animal";
import { Species } from "../../../common/models/species";

@Component({
  selector: 'app-add.dialog',
  templateUrl: './add-wild.html',
  styleUrls: ['./add-wild.scss']
})
export class AddWildAnimalComponent implements OnInit{
  animalInitial: WildAnimal = {
    vaccinated: false,
    birthday: new Date(),
    trackingId: undefined
  }
  declare wildAnimalForm: FormGroup;
  declare species: Species;

  constructor(public dataService: WildAnimalService,
              private router: Router,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.wildAnimalForm = this.formBuilder.group({
      vaccinated: [this.animalInitial.vaccinated, [Validators.required]],
      birthday: [this.animalInitial.birthday, [Validators.required]],
      trackingId: [this.animalInitial.trackingId, [Validators.required]],
    });
  }

  submit() {
    const wildAnimal = this.wildAnimalForm.value;
    wildAnimal.speciesId = this.species.id;

    this.dataService.addItem(wildAnimal)
      .subscribe(result => {
        this.router.navigate(['main'])
          .then();
      });
  }

  speciesSelected(species: Species) {
    this.species = species;
  }
}
