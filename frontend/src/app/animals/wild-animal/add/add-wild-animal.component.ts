import {Component} from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { WildAnimalService } from "../../wild-animal.service";
import { Router } from "@angular/router";
import { WildAnimal } from "../../../common/models/animal";

@Component({
  selector: 'app-add.dialog',
  templateUrl: './add-wild.html',
  styleUrls: ['./add-wild.scss']
})
export class AddWildAnimalComponent {
  petInitial: WildAnimal = {
    vaccinated: false,
    birthday: new Date(),
    trackingId: undefined
  }
  declare wildAnimalForm: FormGroup;
  declare speciesId: number;

  constructor(public dataService: WildAnimalService,
              private router: Router,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.wildAnimalForm = this.formBuilder.group({
      vaccinated: [this.petInitial.vaccinated, [Validators.required]],
      birthday: [this.petInitial.birthday, [Validators.required]],
      trackingId: [this.petInitial.trackingId, [Validators.required]],
    });
  }

  submit() {
    this.dataService.addItem(this.wildAnimalForm.value)
      .subscribe(result => {
        alert('added item');
      });
    this.router.navigate(['main'])
      .then();
  }

  speciesSelected(speciesId: number) {
    this.speciesId = speciesId;
  }
}
