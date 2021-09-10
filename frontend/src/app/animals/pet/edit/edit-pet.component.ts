import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PetService } from "../../pet.service";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { Pet } from "../../../common/models/animal";
import { switchMap } from "rxjs/operators";

@Component({
  selector: 'app-edit.dialog',
  templateUrl: './edit-pet.html',
  styleUrls: ['./edit-pet.css']
})
export class EditPetDialogComponent {
  declare currentId: number;
  declare pet: Pet | null;

  declare petForm: FormGroup;
  declare speciesId: number;
  declare ownerId: number;

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
      // TODO add filter for truthy
    ).subscribe(pet => {
        this.pet = pet;
        this.speciesId = pet?.speciesId!;
        this.petForm = this.formBuilder.group({
          vaccinated: [this.pet?.vaccinated, [Validators.required]],
          birthday: [this.pet?.birthday, [Validators.required]],
        });
    });
  }

  submit() {
    const pet = this.petForm.value;
    pet.id = this.pet!.id;
    pet.speciesId = this.speciesId;
    pet.ownerId = this.ownerId;

    this.dataService.updateItem(pet)
      .subscribe(result => {
        alert('updated item');
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
