import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PetService } from "../../pet.service";
import { Router } from "@angular/router";
import { Pet } from "../../../common/models/animal";

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
  declare petForm: FormGroup

  constructor(public dataService: PetService, private router: Router, private formBuilder: FormBuilder) {
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
}
