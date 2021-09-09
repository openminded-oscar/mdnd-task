import { Component } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
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
  declare pet: Pet|null;

  constructor(private dataService: PetService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.currentId = Number(params.get('id'));
    });

    this.route.paramMap.pipe(switchMap((paramMap: ParamMap) => {
      this.currentId = Number(paramMap.get('id'));
      return this.dataService.getAnimalById(this.currentId);
    })).subscribe(pet => this.pet = pet);
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
