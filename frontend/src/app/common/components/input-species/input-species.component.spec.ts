import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputSpeciesComponent } from './input-species.component';

describe('InputSpeciesComponent', () => {
  let component: InputSpeciesComponent;
  let fixture: ComponentFixture<InputSpeciesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputSpeciesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputSpeciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
