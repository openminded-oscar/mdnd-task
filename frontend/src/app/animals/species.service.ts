import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { AbstractHttpService } from "../common/services/abstract.http.service";
import { DialogDataService } from "../common/services/dialog.data.service";
import { map } from "rxjs/operators";
import { Species } from "../common/models/species";

@Injectable()
export class SpeciesService extends AbstractHttpService<Species> {
  constructor(private httpClient: HttpClient, private dialogDataService: DialogDataService) {
    super(httpClient, 'http://localhost:3000/pets')
  }

  addItem(species: Species): Observable<Species|null> {
    return this.save(species)
      .pipe(map((data: HttpResponse<Species>) => data.body));
  }
}




