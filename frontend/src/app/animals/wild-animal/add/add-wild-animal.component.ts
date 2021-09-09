import {Component} from '@angular/core';

import {FormControl, Validators} from '@angular/forms';
import { WildAnimalService } from "../../wild-animal.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-add.dialog',
  templateUrl: './add-wild.html',
  styleUrls: ['./add-wild.css']
})

export class AddWildAnimalComponent {
  constructor(private dataService: WildAnimalService, private router: Router) { }

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
