import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AnimalsListComponent } from './animals/animals-list/animals-list.component';
import { DeletePetDialogComponent } from "./animals/pet/delete/delete.dialog.component";

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
import { WildAnimalService } from "./animals/wild-animal.service";
import { DeleteWildAnimalDialogComponent } from "./animals/wild-animal/delete/delete.dialog.component";
import { AddOwnerDialogComponent } from "./owners/add/add.dialog.component";
import { EditOwnerDialogComponent } from "./owners/edit/edit.dialog.component";
import { OwnerService } from "./owners/owner.service";
import { AnimalManagerComponent } from './animals/animal-manager/animal-manager.component';
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { AddPetComponent } from "./animals/pet/add/add-pet.component";
import { AddWildAnimalComponent } from "./animals/wild-animal/add/add-wild-animal.component";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { AddSpeciesComponent } from './animals/species/add/add-species.component';
import { InputSpeciesComponent } from './common/components/input-species/input-species.component';
import { InputOwnerComponent } from './common/components/input-owner/input-owner.component';
import { SpeciesService } from "./animals/species.service";
import { ReadEditPetComponent } from "./animals/pet/read-edit/read-edit-pet.component";
import { ReadEditWildAnimalComponent } from "./animals/wild-animal/read-edit/read-edit.component";

@NgModule({
  declarations: [
    AppComponent,

    AnimalsListComponent,
    AddPetComponent,
    ReadEditPetComponent,
    DeletePetDialogComponent,

    AddWildAnimalComponent,
    ReadEditWildAnimalComponent,
    DeleteWildAnimalDialogComponent,

    AddOwnerDialogComponent,
    EditOwnerDialogComponent,
    AnimalManagerComponent,
    AddSpeciesComponent,
    InputSpeciesComponent,
    InputOwnerComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatIconModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
    MatCardModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [WildAnimalService, PetService, OwnerService, SpeciesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
