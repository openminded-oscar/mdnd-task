import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PetService } from "../../pet.service";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { Pet } from "../../../common/models/animal";
import { switchMap } from "rxjs/operators";

@Component({
  selector: 'app-edit.dialog',
  templateUrl: './read-edit-pet.html',
  styleUrls: ['./read-edit-pet.scss']
})
export class ReadEditPetComponent {
  declare currentId: number;
  declare pet: Pet | null;

  declare petForm: FormGroup;
  declare speciesId: number;
  declare ownerId: number;

  editMode: boolean = false;

  constructor(private dataService: PetService,
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
      this.pet = pet;
      this.speciesId = pet?.speciesId!;
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
    pet.speciesId = this.speciesId;
    pet.ownerId = this.ownerId;

    this.dataService.updateItem(pet)
      .subscribe(result => {
        this.router.navigate(['main'])
          .then();
      });
  }

  speciesSelected(speciesId: number) {
    this.speciesId = speciesId;
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
