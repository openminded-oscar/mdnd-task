import {Component} from '@angular/core';

import {FormControl, Validators} from '@angular/forms';
import { PetService } from "../../pet.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-add.dialog',
  templateUrl: './add.dialog.html',
  styleUrls: ['./add.dialog.css']
})

export class AddPetDialogComponent {
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
