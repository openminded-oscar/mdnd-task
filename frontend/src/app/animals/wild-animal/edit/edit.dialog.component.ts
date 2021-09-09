import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { WildAnimalService } from "../../wild-animal.service";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";

@Component({
  selector: 'app-edit.dialog',
  templateUrl: './edit.dialog.html',
  styleUrls: ['./edit.dialog.css']
})
export class EditWildAnimalDialogComponent implements OnInit {
  declare currentId: number;

  constructor(private dataService: WildAnimalService, private router: Router, private route: ActivatedRoute) {
  }

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
