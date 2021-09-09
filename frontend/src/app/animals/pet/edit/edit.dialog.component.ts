import { Component } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { PetService } from "../../pet.service";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";

@Component({
  selector: 'app-edit.dialog',
  templateUrl: './edit.dialog.html',
  styleUrls: ['./edit.dialog.css']
})
export class EditPetDialogComponent {
  declare currentId: number;

  constructor(private dataService: PetService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.currentId = Number(params.get('id'));
    });
  }

  formControl = new FormControl('', [
    Validators.required
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  submit(form: NgForm) {

  }
}
