import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { AbstractHttpService } from "../common/services/abstract.http.service";
import { map } from "rxjs/operators";
import { Species } from "../common/models/species";

@Injectable()
export class SpeciesService extends AbstractHttpService<Species> {
  constructor(private httpClient: HttpClient) {
    super(httpClient, 'http://localhost:3000/species')
  }

  getAll(): Observable<Species[]|null> {
    return this.findAll()
      .pipe(map((data: HttpResponse<Species[]>) => data.body));
  }

  getById(id: any): Observable<Species|null> {
    return this.findById(id)
      .pipe(map((data: HttpResponse<Species>) => data.body));
  }

  addItem(species: Species): Observable<Species|null> {
    return this.save(species)
      .pipe(map((data: HttpResponse<Species>) => data.body));
  }
}




