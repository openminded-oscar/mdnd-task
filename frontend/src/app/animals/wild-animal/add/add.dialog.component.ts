import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';

import {FormControl, Validators} from '@angular/forms';
import {Animal} from '../../../common/models/animal';
import { WildAnimalService } from "../../wild-animal.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-add.dialog',
  templateUrl: './add.dialog.html',
  styleUrls: ['./add.dialog.css']
})

export class AddWildAnimalDialogComponent {
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
