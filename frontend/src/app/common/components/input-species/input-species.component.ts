import { Component, Output, EventEmitter, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AddSpeciesComponent } from "../../../animals/species/add/add-species.component";
import { MatDialog } from "@angular/material/dialog";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { SpeciesService } from "../../../animals/species.service";
import { startWith, map } from "rxjs/operators";
import { Observable } from "rxjs";
import { Species } from "../../models/species";

@Component({
  selector: 'app-input-species',
  templateUrl: './input-species.component.html',
  styleUrls: ['./input-species.component.scss']
})
export class InputSpeciesComponent implements OnChanges, OnInit {
  @Input() declare parentFormGroup: FormGroup;
  @Output() speciesSelected = new EventEmitter<Species>();

  declare formControl: FormControl;

  options: Species[] = [];
  declare filteredOptions: Observable<Species[]>;

  constructor(private dialog: MatDialog, private speciesService: SpeciesService) {
  }

  ngOnInit(): void {
    this.speciesService.getAll()
      .subscribe(results => {
        this.options = results;
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.parentFormGroup) {
      this.formControl = new FormControl('', Validators.required);
      this.filteredOptions = this.formControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value))
      );

      this.parentFormGroup = changes.parentFormGroup.currentValue;
      this.parentFormGroup.addControl('species', this.formControl);
    }
  }

  onSelect(value: Species) {
    this.speciesSelected.emit(value);
  }

  addSpecies() {
    let dialogRef = this.dialog.open(AddSpeciesComponent);

    dialogRef.afterClosed().subscribe(result => {
      const id = result.id;
      if (id) {
        this.speciesSelected.emit(id);
      }
    });
  }

  displaySelectedSpecies(value: Species) {
    return value.label ? value.label : '';
  }

  private _filter(value: any): Species[] {
    if (typeof value === 'string') {
      const filterValue = value.toLowerCase();
      return this.options.filter(option => option.label.toLowerCase().includes(filterValue));
    } else {
      return this.options;
    }
  }
}
