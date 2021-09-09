import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { WildAnimalService } from "../../wild-animal.service";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { switchMap } from "rxjs/operators";
import { Pet, WildAnimal } from "../../../common/models/animal";

@Component({
  selector: 'app-edit.dialog',
  templateUrl: './edit.dialog.html',
  styleUrls: ['./edit.dialog.css']
})
export class EditWildAnimalDialogComponent implements OnInit {
  declare currentId: number;
  declare animal: WildAnimal|null;

  constructor(private dataService: WildAnimalService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.currentId = Number(params.get('id'));
    });

    this.route.paramMap.pipe(switchMap((paramMap: ParamMap) => {
      this.currentId = Number(paramMap.get('id'));
      return this.dataService.getAnimalById(this.currentId);
    })).subscribe(wildAnimal => this.animal = wildAnimal);
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
