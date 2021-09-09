import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputOwnerComponent } from './input-owner.component';

describe('InputOwnerComponent', () => {
  let component: InputOwnerComponent;
  let fixture: ComponentFixture<InputOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputOwnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
