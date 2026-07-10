import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PokemonHuntService } from './pokemon-hunt.service';
import { AuthService } from 'app/modules/auth/services/auth.service';
import { RegisteredPokemon } from '../../../../../entities/pokemon-hunt.entity';
import { environment } from 'environments/environment';

describe('PokemonHuntService', () => {
  let service: PokemonHuntService;
  let httpMock: HttpTestingController;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  const localStorageKey = 'pokemon-hunt-registered';
  const lastSyncKey = 'pokemon-hunt-last-sync';

  const samplePokemon: RegisteredPokemon[] = [
    { number: 1, name: 'bulbasaur', registered: true, pokedexId: 2 },
    { number: 4, name: 'charmander', registered: false, pokedexId: 2 }
  ];

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['isAuthenticated']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        PokemonHuntService,
        { provide: AuthService, useValue: authServiceSpy }
      ]
    });

    service = TestBed.inject(PokemonHuntService);
    httpMock = TestBed.inject(HttpTestingController);
    localStorage.removeItem(localStorageKey);
    localStorage.removeItem(lastSyncKey);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.removeItem(localStorageKey);
    localStorage.removeItem(lastSyncKey);
  });

  describe('when the user is not authenticated', () => {
    beforeEach(() => authServiceSpy.isAuthenticated.and.returnValue(false));

    it('should read registered pokemon from localStorage without calling the API', (done) => {
      localStorage.setItem(localStorageKey, JSON.stringify(samplePokemon));

      service.getRegisteredPokemon().subscribe(result => {
        expect(result).toEqual(samplePokemon);
        done();
      });
    });

    it('should return an empty list when localStorage is empty', (done) => {
      service.getRegisteredPokemon().subscribe(result => {
        expect(result).toEqual([]);
        done();
      });
    });

    it('should return an empty list when localStorage holds corrupt JSON', (done) => {
      localStorage.setItem(localStorageKey, 'not-json{');

      service.getRegisteredPokemon().subscribe(result => {
        expect(result).toEqual([]);
        done();
      });
    });

    it('should save to localStorage only and report local success', (done) => {
      service.saveRegisteredPokemon(samplePokemon).subscribe(response => {
        expect(response.success).toBeTrue();
        expect(JSON.parse(localStorage.getItem(localStorageKey))).toEqual(samplePokemon);
        done();
      });
    });

    it('should clear localStorage data', (done) => {
      localStorage.setItem(localStorageKey, JSON.stringify(samplePokemon));

      service.clearRegisteredPokemon().subscribe(response => {
        expect(response.success).toBeTrue();
        expect(localStorage.getItem(localStorageKey)).toBeNull();
        done();
      });
    });

    it('should refuse to sync with the server', (done) => {
      service.syncWithServer().subscribe(response => {
        expect(response.success).toBeFalse();
        done();
      });
    });
  });

  describe('when the user is authenticated', () => {
    beforeEach(() => authServiceSpy.isAuthenticated.and.returnValue(true));

    it('should fetch registered pokemon from the API', (done) => {
      service.getRegisteredPokemon().subscribe(result => {
        expect(result).toEqual(samplePokemon);
        done();
      });

      const req = httpMock.expectOne(`${environment.nodeJsApi}/api/pokemon-hunt/get`);
      expect(req.request.method).toBe('GET');
      req.flush({ success: true, data: { registeredPokemon: samplePokemon } });
    });

    it('should fall back to localStorage when the API call fails', (done) => {
      localStorage.setItem(localStorageKey, JSON.stringify(samplePokemon));

      service.getRegisteredPokemon().subscribe(result => {
        expect(result).toEqual(samplePokemon);
        done();
      });

      const req = httpMock.expectOne(`${environment.nodeJsApi}/api/pokemon-hunt/get`);
      req.flush('server down', { status: 500, statusText: 'Server Error' });
    });

    it('should mirror to localStorage and post to the API on save', (done) => {
      service.saveRegisteredPokemon(samplePokemon).subscribe(response => {
        expect(response.success).toBeTrue();
        expect(JSON.parse(localStorage.getItem(localStorageKey))).toEqual(samplePokemon);
        done();
      });

      const req = httpMock.expectOne(`${environment.nodeJsApi}/api/pokemon-hunt/save`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body.registeredPokemon).toEqual(samplePokemon);
      req.flush({ success: true });
    });

    it('should keep the local copy and report failure when the save API fails', (done) => {
      service.saveRegisteredPokemon(samplePokemon).subscribe(response => {
        expect(response.success).toBeFalse();
        expect(JSON.parse(localStorage.getItem(localStorageKey))).toEqual(samplePokemon);
        done();
      });

      const req = httpMock.expectOne(`${environment.nodeJsApi}/api/pokemon-hunt/save`);
      req.flush('server down', { status: 500, statusText: 'Server Error' });
    });

    it('should push local data to the server when syncing with pending local changes', (done) => {
      localStorage.setItem(localStorageKey, JSON.stringify(samplePokemon));

      service.syncWithServer().subscribe(response => {
        expect(response.success).toBeTrue();
        done();
      });

      const req = httpMock.expectOne(`${environment.nodeJsApi}/api/pokemon-hunt/save`);
      expect(req.request.method).toBe('POST');
      req.flush({ success: true });
    });
  });

  describe('sync timestamps', () => {
    it('should need sync when there is no previous sync', () => {
      expect(service.needsSync()).toBeTrue();
      expect(service.getLastSync()).toBeNull();
    });

    it('should not need sync right after a successful sync', () => {
      localStorage.setItem(lastSyncKey, new Date().toISOString());
      expect(service.needsSync()).toBeFalse();
    });

    it('should need sync when the last sync is older than five minutes', () => {
      const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
      localStorage.setItem(lastSyncKey, tenMinutesAgo.toISOString());
      expect(service.needsSync()).toBeTrue();
    });
  });
});
