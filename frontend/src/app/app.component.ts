import { Component } from '@angular/core';
import { PetService } from "./services/pet.service";
import { WildAnimalService } from "./services/wild-animal.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';
  wildAnimalsDisplayedColumns = ['id', 'birthday', 'vaccinated', 'speciesId', 'trackingId', 'actions'];
  petsDisplayedColumns = ['id', 'birthday', 'vaccinated', 'actions'];

  constructor(private petService: PetService, private wildAnimalService: WildAnimalService) {
  }
}
