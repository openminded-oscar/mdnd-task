import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnimalManagerComponent } from "./animals/animal-manager/animal-manager.component";
import { AddPetDialogComponent } from "./animals/pet/add/add.dialog.component";
import { AddWildAnimalDialogComponent } from "./animals/wild-animal/add/add.dialog.component";
import { EditWildAnimalDialogComponent } from "./animals/wild-animal/edit/edit.dialog.component";
import { EditPetDialogComponent } from "./animals/pet/edit/edit.dialog.component";

const routes: Routes = [
  {path: '', redirectTo: '/main', pathMatch: 'full'},
  {path: 'main', component: AnimalManagerComponent},
  {path: 'pet/:id', component: EditPetDialogComponent},
  {path: 'wild/:id', component: EditWildAnimalDialogComponent},
  {path: 'pet/new', component: AddPetDialogComponent},
  {path: 'wild/new', component: AddWildAnimalDialogComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
