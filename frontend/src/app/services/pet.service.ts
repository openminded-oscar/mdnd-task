import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Animal } from '../models/animal';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { AbstractHttpService } from "./abstract.http.service";

@Injectable()
export class PetService extends AbstractHttpService<Animal> {
  dataChange: BehaviorSubject<Animal[]> = new BehaviorSubject<Animal[]>([]);
  dialogData: any;

  constructor(private httpClient: HttpClient) {
    super(httpClient, 'http://localhost:3000/pets')
  }

  get data(): Animal[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  getAllAnimals(): void {
    this.findAll().subscribe((data: HttpResponse<Animal[]>) => {
        this.dataChange.next(data.body ? data.body : []);
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      });
  }

  addItem(animal: Animal): void {
    this.save(animal).subscribe(data => {
        this.dialogData = data.body;
        alert('Successfully added');
      },
      (err: HttpErrorResponse) => {
        alert('Error occurred. Details: ' + err.name + ' ' + err.message);
      });
  }

  updateItem(animal: Animal): void {
    this.update(animal).subscribe(data => {
        this.dialogData = data.body;
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




