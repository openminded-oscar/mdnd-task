import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WildAnimalService } from "../../wild-animal.service";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { switchMap } from "rxjs/operators";
import { WildAnimal } from "../../../common/models/animal";
import { Species } from "../../../common/models/species";
import { SpeciesService } from "../../species.service";

@Component({
  selector: 'app-edit.dialog',
  templateUrl: './read-edit.html',
  styleUrls: ['./read-edit.scss']
})
export class ReadEditWildAnimalComponent implements OnInit {
  declare currentId: number;
  declare wildAnimal: WildAnimal;

  declare wildAnimalForm: FormGroup;

  declare species: Species;

  editMode: boolean = false;

  constructor(private dataService: WildAnimalService,
              private speciesService: SpeciesService,
              private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder) {
  }


  ngOnInit() {
    this.route.paramMap.pipe(switchMap((paramMap: ParamMap) => {
      this.currentId = Number(paramMap.get('id'));
      return this.dataService.getAnimalById(this.currentId);
    })).subscribe(wildAnimal => {
      this.speciesService.getById(wildAnimal.speciesId)
        .subscribe(species=>{
          this.species = species;
        });
      this.wildAnimal = wildAnimal;
      this.wildAnimalForm = this.formBuilder.group({
        vaccinated: [this.wildAnimal!.vaccinated, [Validators.required]],
        birthday: [this.wildAnimal!.birthday, [Validators.required]],
        trackingId: [this.wildAnimal!.trackingId, [Validators.required]],
      });
      this.wildAnimalForm.disable();
    });
  }

  submit() {
    const wildAnimal = this.wildAnimalForm.value;
    wildAnimal.id = this.wildAnimal!.id;
    wildAnimal.speciesId = this.species.id;

    this.dataService.updateItem(wildAnimal)
      .subscribe(result => {
        this.router.navigate(['main'])
          .then();
      });
  }

  speciesSelected(species: Species) {
    this.species = species;
  }

  makeEditable(){
    this.editMode=true;
    this.wildAnimalForm.enable();
  }

  cancelEdit(){
    this.editMode=false;
    this.wildAnimalForm.disable();
  }
}
