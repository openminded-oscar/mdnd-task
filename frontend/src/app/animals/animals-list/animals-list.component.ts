import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { MatDialog } from "@angular/material/dialog";
import { AddPetDialogComponent } from "../pets/add/add.dialog.component";
import { EditPetDialogComponent } from "../pets/edit/edit.dialog.component";
import { DeletePetDialogComponent } from "../pets/delete/delete.dialog.component";
import { DataSource } from "@angular/cdk/collections";
import { Animal } from "../../models/animal";

import { BehaviorSubject, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { DialogDataService } from "../../services/dialog.data.service";
import { WildAnimalService } from "../../services/wild-animal.service";
import { PetService } from "../../services/pet.service";

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

  constructor(public dialog: MatDialog,
              public dialogDataService: DialogDataService,
              public wildService: WildAnimalService,
              public petService: PetService) {
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
    const dialogRef = this.dialog.open(AddPetDialogComponent, {
      data: {issue: Animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.animalService.dataChange.value.push(this.dialogDataService.getDialogData());
        this.refreshTable();
      }
    });
  }

  startEdit(i: number, id: number, title: string, state: string, url: string, created_at: string, updated_at: string) {
    this.id = id;
    this.index = i;
    const dialogRef = this.dialog.open(EditPetDialogComponent, {
      data: {id: id, title: title, state: state, url: url, created_at: created_at, updated_at: updated_at}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.animalService.dataChange.value.findIndex((x: any) => x.id === this.id);
        // Then you update that record using data from dialogData (values you enetered)
        this.animalService.dataChange.value[foundIndex] = this.dialogDataService.getDialogData();
        // And lastly refresh table
        this.refreshTable();
      }
    });
  }

  deleteItem(i: number, id: number, title: string, state: string, url: string) {
    this.index = i;
    this.id = id;
    const dialogRef = this.dialog.open(DeletePetDialogComponent, {
      data: {id: id, title: title}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const foundIndex = this.animalService.dataChange.value.findIndex((x: any) => x.id === this.id);
        // for delete we use splice in order to remove single object from DataService
        this.animalService.dataChange.value.splice(foundIndex, 1);
        this.refreshTable();
      }
    });
  }


  private refreshTable() {
    // implement
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
