import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnimalManagerComponent } from "./animals/animal-manager/animal-manager.component";
import { EditWildAnimalDialogComponent } from "./animals/wild-animal/edit/edit.dialog.component";
import { AddPetComponent } from "./animals/pet/add/add-pet.component";
import { EditPetDialogComponent } from "./animals/pet/edit/edit-pet.component";
import { AddWildAnimalComponent } from "./animals/wild-animal/add/add-wild-animal.component";

const routes: Routes = [
  {path: '', redirectTo: '/main', pathMatch: 'full'},
  {path: 'main', component: AnimalManagerComponent},
  {path: 'pet/:id', component: EditPetDialogComponent},
  {path: 'wild/:id', component: EditWildAnimalDialogComponent},
  {path: 'pet/new', component: AddPetComponent},
  {path: 'wild/new', component: AddWildAnimalComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
