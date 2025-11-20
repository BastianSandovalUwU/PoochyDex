import { Component, OnInit } from '@angular/core';
import { PoochyDexApiService } from '../../services/poochyDexApi.service';
import { POKEMON_TYPES } from '../../../../../../entities/common/const.interface';
import { LanguageService } from 'app/modules/shared/services/language.service';
import { HelperService } from 'app/modules/shared/services/helper.service';
import { CreatePokemonRequest, Pokemon } from '../../../../../../entities/poochydex-api/pokemon.type';
import { Router } from '@angular/router';
import { AuthService } from 'app/modules/auth/services/auth.service';

@Component({
  selector: 'app-crud-api',
  templateUrl: './crud-api.component.html',
  styleUrls: ['./crud-api.component.scss']
})
export class CrudApiComponent implements OnInit {

  pokemonList: Pokemon[] = [];
  loading = false;
  errorMessage = '';

  pokemonTypes: string[] = Object.values(POKEMON_TYPES);
  language: string = 'es';

  // Formulario simple para crear/editar
  isEditMode = false;
  editingPokemonId: number | null = null;
  showModal = false;

  // Modo de trabajo: false = Pokémon base, true = formas alternativas
  isFormMode = false;

  formData: CreatePokemonRequest = {
    number: 0,
    name: '',
    type: '',
    type2: '',
    generationId: 1,
    sprites: {
      homeUrl: '',
      homeShinyUrl: '',
      iconUrl: '',
      sugimoriArt: '',
      globalLinkArt: ''
    }
  };

  constructor(
    private poochyDexApiService: PoochyDexApiService,
    private languageService: LanguageService,
    public helperService: HelperService,
    private router: Router,
    private authService: AuthService
  ) {
    const userData = this.authService.getSessionData();
    if(!userData || userData.role !== 'ADMIN') {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.languageService.currentLanguage$.subscribe(lang => {
      this.language = lang || 'es';
    });
    this.loadPokemon();
  }

  getTypeLabel(typeName: string): string {
    return this.helperService.getGameIconNameForLanguage(typeName, this.language);
  }

  loadPokemon(): void {
    this.loading = true;
    this.errorMessage = '';

    const obs = this.isFormMode
      ? this.poochyDexApiService.getAllPokemonForms()
      : this.poochyDexApiService.getAllPokemon();

    obs.subscribe({
      next: (resp) => {
        const data = Array.isArray(resp.data) ? resp.data : [];
        this.pokemonList = data.sort((a, b) => a.number - b.number);
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = this.isFormMode
          ? 'Error cargando las formas de Pokémon'
          : 'Error cargando los Pokémon';
        this.loading = false;
      }
    });
  }

  resetForm(): void {
    this.isEditMode = false;
    this.editingPokemonId = null;
    this.formData = {
      number: 0,
      name: '',
      type: '',
      type2: '',
      generationId: 1,
      sprites: {
        homeUrl: '',
        homeShinyUrl: '',
        iconUrl: '',
        sugimoriArt: '',
        globalLinkArt: ''
      }
    };
  }

  startCreate(): void {
    this.resetForm();
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.resetForm();
  }

  startEdit(pokemon: Pokemon): void {
    this.isEditMode = true;
    this.editingPokemonId = pokemon.id ?? null;
    this.formData = {
      number: pokemon.number,
      name: pokemon.name,
      type: pokemon.type,
      type2: pokemon.type2,
      generationId: pokemon.generationId,
      sprites: {
        homeUrl: pokemon.sprites.homeUrl,
        homeShinyUrl: pokemon.sprites.homeShinyUrl,
        iconUrl: pokemon.sprites.iconUrl,
        sugimoriArt: pokemon.sprites.sugimoriArt,
        globalLinkArt: pokemon.sprites.globalLinkArt
      }
    };
    this.showModal = true;
  }

  savePokemon(): void {
    if (!this.formData.number || !this.formData.name || !this.formData.type || !this.formData.generationId || !this.formData.sprites.homeUrl || !this.formData.sprites.iconUrl) {
      this.errorMessage = 'Número, nombre, tipo, generación, homeUrl e iconUrl son obligatorios';
      return;
    }

    this.errorMessage = '';
    this.loading = true;

    const isEdit = this.isEditMode && this.editingPokemonId != null;

    const request$ = (() => {
      if (isEdit) {
        return this.isFormMode
          ? this.poochyDexApiService.updatePokemonForm(this.editingPokemonId!, this.formData)
          : this.poochyDexApiService.updatePokemon(this.editingPokemonId!, this.formData);
      } else {
        return this.isFormMode
          ? this.poochyDexApiService.createPokemonForm(this.formData)
          : this.poochyDexApiService.createPokemon(this.formData);
      }
    })();

    request$.subscribe({
      next: () => {
        this.loading = false;
        this.showModal = false;
        this.resetForm();
        this.loadPokemon();
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = isEdit
          ? (this.isFormMode ? 'Error actualizando la forma de Pokémon' : 'Error actualizando el Pokémon')
          : (this.isFormMode ? 'Error creando la forma de Pokémon' : 'Error creando el Pokémon');
        this.loading = false;
      }
    });
  }

  deletePokemon(pokemon: Pokemon): void {
    if (!pokemon.id) {
      return;
    }
    const confirmed = window.confirm(`¿Eliminar a ${pokemon.name}?`);
    if (!confirmed) {
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    const request$ = this.isFormMode
      ? this.poochyDexApiService.deletePokemonForm(pokemon.id)
      : this.poochyDexApiService.deletePokemon(pokemon.id);

    request$.subscribe({
      next: () => {
        this.loading = false;
        this.loadPokemon();
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = this.isFormMode
          ? 'Error eliminando la forma de Pokémon'
          : 'Error eliminando el Pokémon';
        this.loading = false;
      }
    });
  }
}

