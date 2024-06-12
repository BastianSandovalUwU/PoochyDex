/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PokemonVarietiesComponent } from './pokemon-varieties.component';

describe('PokemonVarietiesComponent', () => {
  let component: PokemonVarietiesComponent;
  let fixture: ComponentFixture<PokemonVarietiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PokemonVarietiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonVarietiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
