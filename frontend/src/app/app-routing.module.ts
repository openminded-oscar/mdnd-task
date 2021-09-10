import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnimalManagerComponent } from "./animals/animal-manager/animal-manager.component";
import { AddPetComponent } from "./animals/pet/add/add-pet.component";
import { AddWildAnimalComponent } from "./animals/wild-animal/add/add-wild-animal.component";
import { ReadEditPetComponent } from "./animals/pet/read-edit/read-edit-pet.component";
import { ReadEditWildAnimalComponent } from "./animals/wild-animal/read-edit/read-edit.component";

const routes: Routes = [
  {path: '', redirectTo: '/main', pathMatch: 'full'},
  {path: 'main', component: AnimalManagerComponent},
  {path: 'pet/new', component: AddPetComponent},
  {path: 'wild/new', component: AddWildAnimalComponent},
  {path: 'pet/:id', component: ReadEditPetComponent},
  {path: 'wild/:id', component: ReadEditWildAnimalComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
