import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';
  wildAnimalsDisplayedColumns = ['id', 'birthday', 'vaccinated', 'speciesId', 'trackingId', 'actions'];
  petsDisplayedColumns = ['id', 'birthday', 'vaccinated', 'actions'];
}
