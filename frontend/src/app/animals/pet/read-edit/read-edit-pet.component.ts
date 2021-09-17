import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PetService } from "../../pet.service";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { Pet } from "../../../common/models/animal";
import { switchMap } from "rxjs/operators";
import { Species } from "../../../common/models/species";
import { SpeciesService } from "../../species.service";

@Component({
  selector: 'app-edit.dialog',
  templateUrl: './read-edit-pet.html',
  styleUrls: ['./read-edit-pet.scss']
})
export class ReadEditPetComponent implements OnInit {
  declare currentId: number;
  declare pet: Pet;

  declare petForm: FormGroup;
  declare species: Species;
  declare ownerId: number;

  editMode: boolean = false;

  constructor(private dataService: PetService,
              private speciesService: SpeciesService,
              private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((paramMap: ParamMap) => {
        this.currentId = Number(paramMap.get('id'));
        return this.dataService.getAnimalById(this.currentId);
      })
    ).subscribe(pet => {
      this.speciesService.getById(pet.speciesId)
        .subscribe(species=>{
          this.species = species;
        });
      this.pet = pet;
      this.petForm = this.formBuilder.group({
        vaccinated: [this.pet?.vaccinated, [Validators.required]],
        birthday: [this.pet?.birthday, [Validators.required]],
      });
      this.petForm.disable();
    });
  }

  submit() {
    const pet = this.petForm.value;
    pet.id = this.pet!.id;
    pet.speciesId = this.species.id;
    pet.ownerId = this.ownerId;

    this.dataService.updateItem(pet)
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

  makeEditable() {
    this.editMode = true;
    this.petForm.enable();
  }

  cancelEdit() {
    this.editMode = false;
    this.petForm.disable();
  }
}
