import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { MatDialog } from "@angular/material/dialog";
import { AddDialogComponent } from "../dialogs/add/add.dialog.component";
import { EditDialogComponent } from "../dialogs/edit/edit.dialog.component";
import { DeleteDialogComponent } from "../dialogs/delete/delete.dialog.component";
import { DataSource } from "@angular/cdk/collections";
import { DataService } from "../../services/data.service";
import { Animal } from "../../models/animal";

import { BehaviorSubject, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";

@Component({
  selector: 'app-animals-list',
  templateUrl: './animals-list.component.html',
  styleUrls: ['./animals-list.component.scss']
})
export class AnimalsListComponent implements OnInit {
  @Input()
  displayedColumns: string[] = [];

  declare database: DataService;
  declare dataSource: AnimalDataSource;
  declare index: number;
  declare id: number;

  constructor(public httpClient: HttpClient,
              public dialog: MatDialog,
              public dataService: DataService) {}

  ngOnInit() {
    this.loadData();
  }

  refresh() {
    this.loadData();
  }

  public loadData() {
    this.database = new DataService(this.httpClient);
    this.dataSource = new AnimalDataSource(this.database);
  }

  addNew() {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      data: {issue: Animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.database.dataChange.value.push(this.dataService.getDialogData());
        this.refreshTable();
      }
    });
  }

  startEdit(i: number, id: number, title: string, state: string, url: string, created_at: string, updated_at: string) {
    this.id = id;
    this.index = i;
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: {id: id, title: title, state: state, url: url, created_at: created_at, updated_at: updated_at}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.database.dataChange.value.findIndex(x => x.id === this.id);
        // Then you update that record using data from dialogData (values you enetered)
        this.database.dataChange.value[foundIndex] = this.dataService.getDialogData();
        // And lastly refresh table
        this.refreshTable();
      }
    });
  }

  deleteItem(i: number, id: number, title: string, state: string, url: string) {
    this.index = i;
    this.id = id;
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {id: id, title: title}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const foundIndex = this.database.dataChange.value.findIndex(x => x.id === this.id);
        // for delete we use splice in order to remove single object from DataService
        this.database.dataChange.value.splice(foundIndex, 1);
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

  constructor(public dataService: DataService) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Animal[]> {
    const displayDataChanges = [
      this.dataService.dataChange,
      this._filterChange,
    ];

    this.dataService.getAllAnimals();


    return merge(...displayDataChanges).pipe(map( () => {
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

  disconnect() {}
}
