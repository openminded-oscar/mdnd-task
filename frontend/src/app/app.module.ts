import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AnimalsListComponent } from './animals/animals-list/animals-list.component';
import { EditPetDialogComponent } from "./animals/pet/edit/edit.dialog.component";
import { DeletePetDialogComponent } from "./animals/pet/delete/delete.dialog.component";
import { AddPetDialogComponent } from "./animals/pet/add/add.dialog.component";

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { MatCardModule } from "@angular/material/card";
import { PetService } from "./animals/pet.service";
import { DialogDataService } from "./common/services/dialog.data.service";
import { WildAnimalService } from "./animals/wild-animal.service";
import { AddWildAnimalDialogComponent } from "./animals/wild-animal/add/add.dialog.component";
import { EditWildAnimalDialogComponent } from "./animals/wild-animal/edit/edit.dialog.component";
import { DeleteWildAnimalDialogComponent } from "./animals/wild-animal/delete/delete.dialog.component";
import { AddOwnerDialogComponent } from "./owners/add/add.dialog.component";
import { EditOwnerDialogComponent } from "./owners/edit/edit.dialog.component";
import { DeleteOwnerDialogComponent } from "./owners/delete/delete.dialog.component";
import { OwnerService } from "./owners/owner.service";
import { AnimalManagerComponent } from './animals/animal-manager/animal-manager.component';
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [
    AppComponent,

    AnimalsListComponent,
    AddPetDialogComponent,
    EditPetDialogComponent,
    DeletePetDialogComponent,

    AddWildAnimalDialogComponent,
    EditWildAnimalDialogComponent,
    DeleteWildAnimalDialogComponent,

    AddOwnerDialogComponent,
    EditOwnerDialogComponent,
    DeleteOwnerDialogComponent,
    AnimalManagerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatCardModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [WildAnimalService, PetService, OwnerService, DialogDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
