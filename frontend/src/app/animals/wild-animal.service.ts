import {Injectable} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {WildAnimal} from '../common/models/animal';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { AbstractHttpService } from "../common/services/abstract.http.service";
import { map } from "rxjs/operators";

@Injectable()
export class WildAnimalService extends AbstractHttpService<WildAnimal> {
  dataChange: BehaviorSubject<WildAnimal[]> = new BehaviorSubject<WildAnimal[]>([]);

  constructor (private httpClient: HttpClient) {
    super(httpClient, 'http://localhost:3000/wild-animals')
  }

  get data(): WildAnimal[] {
    return this.dataChange.value;
  }

  getAllAnimals(): void {
    this.findAll().subscribe((data: HttpResponse<WildAnimal[]>) => {
        this.dataChange.next(data.body ? data.body : []);
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      });
  }

  getAnimalById(id: any): Observable<WildAnimal|null> {
    return this.findById(id)
      .pipe(map((data: HttpResponse<WildAnimal>) => data.body));
  }

  addItem(animal: WildAnimal): Observable<WildAnimal|null> {
    return this.save(animal)
      .pipe(map((data: HttpResponse<WildAnimal>) => data.body));
  }

  updateItem(animal: WildAnimal): Observable<WildAnimal|null>  {
    return this.update(animal)
      .pipe(map((data: HttpResponse<WildAnimal>) => data.body));
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




