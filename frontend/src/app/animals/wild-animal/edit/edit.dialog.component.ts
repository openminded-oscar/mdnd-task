import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
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
  declare wildAnimal: WildAnimal|null;

  declare wildAnimalForm: FormGroup;
  declare speciesId: number;

  constructor(private dataService: WildAnimalService,
              private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder) {
  }


  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.currentId = Number(params.get('id'));
    });

    this.route.paramMap.pipe(switchMap((paramMap: ParamMap) => {
      this.currentId = Number(paramMap.get('id'));
      return this.dataService.getAnimalById(this.currentId);
    })).subscribe(wildAnimal => {
      this.wildAnimal = wildAnimal;
      this.speciesId = this.wildAnimal?.speciesId!;
      this.wildAnimalForm = this.formBuilder.group({
        vaccinated: [this.wildAnimal!.vaccinated, [Validators.required]],
        birthday: [this.wildAnimal!.birthday, [Validators.required]],
        trackingId: [this.wildAnimal!.trackingId, [Validators.required]],
      });
    });
  }

  submit() {
    const wildAnimal = this.wildAnimalForm.value;
    wildAnimal.id = this.wildAnimal!.id;
    wildAnimal.speciesId = this.speciesId;

    this.dataService.updateItem(wildAnimal)
      .subscribe(result => {
        alert('updated item');
      });
    this.router.navigate(['main'])
      .then();
  }

  speciesSelected(speciesId: number) {
    this.speciesId = speciesId;
  }
}
