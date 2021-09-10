import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { AbstractHttpService } from "../common/services/abstract.http.service";
import { Owner } from "../common/models/owner";
import { map } from "rxjs/operators";

@Injectable()
export class OwnerService extends AbstractHttpService<Owner> {
  dataChange: BehaviorSubject<Owner[]> = new BehaviorSubject<Owner[]>([]);

  constructor(private httpClient: HttpClient) {
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

  addItem(owner: Owner): Observable<Owner|null> {
    return this.save(owner)
      .pipe(map((data: HttpResponse<Owner>) => data.body));
  }
}




