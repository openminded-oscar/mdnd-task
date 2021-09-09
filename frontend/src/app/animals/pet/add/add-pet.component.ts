import {Component} from '@angular/core';

import {FormControl, Validators} from '@angular/forms';
import { PetService } from "../../pet.service";
import { Router } from "@angular/router";
import { Pet } from "../../../common/models/animal";

@Component({
  selector: 'app-add.dialog',
  templateUrl: './add-pet.html',
  styleUrls: ['./add-pet.css']
})

export class AddPetComponent {
  pet: Pet = {
    title: '',
    vaccinated: false,
    birthday: new Date()
  }

  constructor(public dataService: PetService, private router: Router) { }

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  submit() {
  // empty stuff
  }
}
