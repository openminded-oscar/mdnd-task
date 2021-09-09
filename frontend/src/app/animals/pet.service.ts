import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Animal } from '../common/models/animal';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { AbstractHttpService } from "../common/services/abstract.http.service";
import { DialogDataService } from "../common/services/dialog.data.service";
import { map } from "rxjs/operators";

@Injectable()
export class PetService extends AbstractHttpService<Animal> {
  dataChange: BehaviorSubject<Animal[]> = new BehaviorSubject<Animal[]>([]);

  constructor(private httpClient: HttpClient, private dialogDataService: DialogDataService) {
    super(httpClient, 'http://localhost:3000/pets')
  }

  get data(): Animal[] {
    return this.dataChange.value;
  }

  getAllAnimals(): void {
    this.findAll().subscribe((data: HttpResponse<Animal[]>) => {
        this.dataChange.next(data.body ? data.body : []);
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      });
  }

  getAnimalById(id: any): Observable<Animal|null> {
    return this.findById(id)
      .pipe(map((data: HttpResponse<Animal>) => data.body));
  }

  addItem(animal: Animal): void {
    this.save(animal).subscribe(data => {
        this.dialogDataService.dialogData = data.body;
        alert('Successfully added');
      },
      (err: HttpErrorResponse) => {
        alert('Error occurred. Details: ' + err.name + ' ' + err.message);
      });
  }

  updateItem(animal: Animal): void {
    this.update(animal).subscribe(data => {
        this.dialogDataService.dialogData = data.body;
        alert('Successfully edited');
      },
      (err: HttpErrorResponse) => {
        alert('Error occurred. Details: ' + err.name + ' ' + err.message);
      }
    );
  }

  deleteItem(id: string): void {
    this.delete(id).subscribe(data => {
        alert('Successfully deleted');
      },
      (err: HttpErrorResponse) => {
        alert('Error occurred. Details: ' + err.name + ' ' + err.message);
      }
    );
  }
}



