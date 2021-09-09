import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-animal-manager',
  templateUrl: './animal-manager.component.html',
  styleUrls: ['./animal-manager.component.scss']
})
export class AnimalManagerComponent implements OnInit {
  wildAnimalsDisplayedColumns = ['id', 'birthday', 'vaccinated', 'speciesId', 'trackingId', 'actions'];
  petsDisplayedColumns = ['id', 'birthday', 'vaccinated', 'speciesId', 'ownerId', 'actions'];

  constructor() { }

  ngOnInit(): void {
  }
}
