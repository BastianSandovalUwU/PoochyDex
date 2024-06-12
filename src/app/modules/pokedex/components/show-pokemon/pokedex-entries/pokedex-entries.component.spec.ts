/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PokedexEntriesComponent } from './pokedex-entries.component';

describe('PokedexEntriesComponent', () => {
  let component: PokedexEntriesComponent;
  let fixture: ComponentFixture<PokedexEntriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PokedexEntriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokedexEntriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
