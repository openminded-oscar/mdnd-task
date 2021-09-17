import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Pet } from '../common/models/animal';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { AbstractHttpService } from "../common/services/abstract.http.service";
import { map } from "rxjs/operators";

@Injectable()
export class PetService extends AbstractHttpService<Pet> {
  dataChange: BehaviorSubject<Pet[]> = new BehaviorSubject<Pet[]>([]);

  constructor(private httpClient: HttpClient) {
    super(httpClient, 'http://localhost:3000/pets')
  }

  get data(): Pet[] {
    return this.dataChange.value;
  }

  getAllAnimals(): void {
    this.findAll().subscribe((data: HttpResponse<Pet[]>) => {
        this.dataChange.next(data.body ? data.body : []);
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      });
  }

  getAnimalById(id: any): Observable<Pet> {
    return this.findById(id)
      .pipe(map((data: HttpResponse<Pet>) => data.body!));
  }

  addItem(animal: Pet): Observable<Pet> {
    delete animal.species;
    return this.save(animal)
      .pipe(map((data: HttpResponse<Pet>) => data.body!));
  }

  updateItem(animal: Pet): Observable<Pet>  {
    delete animal.species;
    return this.update(animal)
      .pipe(map((data: HttpResponse<Pet>) => data.body!));
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




