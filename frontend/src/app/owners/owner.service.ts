import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { AbstractHttpService } from "../common/services/abstract.http.service";
import { DialogDataService } from "../common/services/dialog.data.service";
import { Owner } from "../common/models/owner";

@Injectable()
export class OwnerService extends AbstractHttpService<Owner> {
  dataChange: BehaviorSubject<Owner[]> = new BehaviorSubject<Owner[]>([]);

  constructor(private httpClient: HttpClient, private dialogDataService: DialogDataService) {
    super(httpClient, 'http://localhost:3000/owners')
  }

  get data(): Owner[] {
    return this.dataChange.value;
  }

  getAllOwners(): void {
    this.findAll().subscribe((data: HttpResponse<Owner[]>) => {
        this.dataChange.next(data.body ? data.body : []);
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      });
  }

  addItem(Owner: Owner): void {
    this.save(Owner).subscribe(data => {
        this.dialogDataService.dialogData = data.body;
        alert('Successfully added');
      },
      (err: HttpErrorResponse) => {
        alert('Error occurred. Details: ' + err.name + ' ' + err.message);
      });
  }

  updateItem(Owner: Owner): void {
    this.update(Owner).subscribe(data => {
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




