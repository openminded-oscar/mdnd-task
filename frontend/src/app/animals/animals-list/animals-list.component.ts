import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { EditPetDialogComponent } from "../pet/edit/edit.dialog.component";
import { DeletePetDialogComponent } from "../pet/delete/delete.dialog.component";
import { DataSource } from "@angular/cdk/collections";
import { Animal } from "../../common/models/animal";

import { BehaviorSubject, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { DialogDataService } from "../../common/services/dialog.data.service";
import { WildAnimalService } from "../wild-animal.service";
import { PetService } from "../pet.service";
import { DeleteWildAnimalDialogComponent } from "../wild-animal/delete/delete.dialog.component";
import { Router } from "@angular/router";

@Component({
  selector: 'app-animals-list',
  templateUrl: './animals-list.component.html',
  styleUrls: ['./animals-list.component.scss']
})
export class AnimalsListComponent implements OnInit {
  @Input()
  declare displayedColumns: string[];
  @Input()
  declare type: string;

  declare animalService: any;
  declare dataSource: AnimalDataSource;
  declare index: number;
  declare id: number;

  constructor(private dialog: MatDialog,
              private dialogDataService: DialogDataService,
              private router: Router,
              private wildService: WildAnimalService,
              private petService: PetService) {
  }

  ngOnInit() {
    this.animalService = (this.type === 'pet' ? this.petService : this.wildService);
    this.loadData();
  }

  refresh() {
    this.loadData();
  }

  public loadData() {
    this.dataSource = new AnimalDataSource(this.animalService);
  }

  addNew() {
    const pathForNew = this.type === 'pet' ? 'pet/new' : 'wild/new';
    this.router.navigate([pathForNew])
      .then();
  }

  deleteItem(i: number, id: number) {
    this.index = i;
    this.id = id;

    let dialogRef;
    if(this.type === 'pet') {
      dialogRef = this.dialog.open(DeletePetDialogComponent, {
        data: {id: id}
      });
    } else {
      dialogRef = this.dialog.open(DeleteWildAnimalDialogComponent, {
        data: {id: id}
      });
    }

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const foundIndex = this.animalService.dataChange.value.findIndex((x: any) => x.id === this.id);
        this.animalService.dataChange.value.splice(foundIndex, 1);
        this.refresh();
      }
    });
  }
}

export class AnimalDataSource extends DataSource<Animal> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: Animal[] = [];
  renderedData: Animal[] = [];

  constructor(public dataService: any) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Animal[]> {
    const displayDataChanges = [
      this.dataService.dataChange,
      this._filterChange,
    ];

    this.dataService.getAllAnimals();


    return merge(...displayDataChanges).pipe(map(() => {
        // Filter data
        this.filteredData = this.dataService.data.slice().filter((animal: Animal) => {
          const searchStr = (String(animal.id) + animal.title + animal.created_at).toLowerCase();
          return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
        });

        this.renderedData = this.filteredData;
        return this.renderedData;
      }
    ));
  }

  disconnect() {
  }
}
