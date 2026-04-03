import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'environments/environment';
import { AuthService } from 'app/modules/auth/services/auth.service';
import { RegisteredPokemon, PokemonHuntData, PokemonHuntResponse } from '../../../../../entities/pokemon-hunt.entity';

@Injectable({
  providedIn: 'root'
})
export class PokemonHuntService {
  private apiUrl = environment.nodeJsApi;
  private localStorageKey = 'pokemon-hunt-registered';
  private lastSyncKey = 'pokemon-hunt-last-sync';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  /**
   * Fetches registered Pokémon from the backend.
   * If the user is not authenticated, returns data from localStorage.
   */
  getRegisteredPokemon(): Observable<RegisteredPokemon[]> {
    if (!this.authService.isAuthenticated()) {
      return of(this.getLocalRegisteredPokemon());
    }

    return this.http.get<PokemonHuntResponse>(`${this.apiUrl}/api/pokemon-hunt/get`).pipe(
      map(response => {
        if (response.success && response.data) {
          this.setLastSync();
          return response.data.registeredPokemon;
        }
        return [];
      }),
      catchError(error => {
        console.error('Error loading pokemon hunt data from server:', error);
        // On failure, fall back to local data
        return of(this.getLocalRegisteredPokemon());
      })
    );
  }

  /**
   * Saves registered Pokémon to the backend.
   * If the user is not authenticated, only persists to localStorage.
   */
  saveRegisteredPokemon(registeredPokemon: RegisteredPokemon[]): Observable<PokemonHuntResponse> {
    // Always mirror to localStorage as backup
    this.saveToLocalStorage(registeredPokemon);

    if (!this.authService.isAuthenticated()) {
      return of({
        success: true,
        message: 'Saved locally (user not authenticated)'
      });
    }

    const data: PokemonHuntData = {
      registeredPokemon: registeredPokemon,
      lastUpdated: new Date()
    };

    return this.http.post<PokemonHuntResponse>(`${this.apiUrl}/api/pokemon-hunt/save`, data).pipe(
      tap(response => {
        if (response.success) {
          this.setLastSync();
        }
      }),
      catchError(error => {
        console.error('Error saving pokemon hunt data to server:', error);
        // Data is already in localStorage even if the server fails
        return of({
          success: false,
          message: 'Saved locally but failed to sync with server'
        });
      })
    );
  }

  /**
   * Updates registered Pokémon (partial updates supported).
   * Useful for incremental updates.
   */
  updateRegisteredPokemon(registeredPokemon: RegisteredPokemon[]): Observable<PokemonHuntResponse> {
    // Always update localStorage
    this.saveToLocalStorage(registeredPokemon);

    if (!this.authService.isAuthenticated()) {
      return of({
        success: true,
        message: 'Updated locally (user not authenticated)'
      });
    }

    const data: PokemonHuntData = {
      registeredPokemon: registeredPokemon,
      lastUpdated: new Date()
    };

    return this.http.put<PokemonHuntResponse>(`${this.apiUrl}/api/pokemon-hunt/update`, data).pipe(
      tap(response => {
        if (response.success) {
          this.setLastSync();
        }
      }),
      catchError(error => {
        console.error('Error updating pokemon hunt data on server:', error);
        return of({
          success: false,
          message: 'Updated locally but failed to sync with server'
        });
      })
    );
  }

  /**
   * Clears all registered Pokémon.
   */
  clearRegisteredPokemon(): Observable<PokemonHuntResponse> {
    localStorage.removeItem(this.localStorageKey);
    localStorage.removeItem(this.lastSyncKey);

    if (!this.authService.isAuthenticated()) {
      return of({
        success: true,
        message: 'Cleared locally (user not authenticated)'
      });
    }

    return this.http.delete<PokemonHuntResponse>(`${this.apiUrl}/api/pokemon-hunt/clear`).pipe(
      tap(response => {
        if (response.success) {
          this.setLastSync();
        }
      }),
      catchError(error => {
        console.error('Error clearing pokemon hunt data on server:', error);
        return of({
          success: false,
          message: 'Cleared locally but failed to sync with server'
        });
      })
    );
  }

  /**
   * Syncs local data with the server (e.g. after login).
   */
  syncWithServer(): Observable<PokemonHuntResponse> {
    if (!this.authService.isAuthenticated()) {
      return of({
        success: false,
        message: 'User not authenticated'
      });
    }

    const localData = this.getLocalRegisteredPokemon();

    if (localData.length > 0) {
      return this.saveRegisteredPokemon(localData);
    }

    return this.getRegisteredPokemon().pipe(
      map(serverData => ({
        success: true,
        message: 'Synced successfully',
        data: {
          registeredPokemon: serverData,
          lastUpdated: new Date()
        }
      })),
      catchError(error => {
        return of({
          success: false,
          message: 'Failed to sync with server'
        });
      })
    );
  }

  /**
   * Reads registered Pokémon from localStorage.
   */
  private getLocalRegisteredPokemon(): RegisteredPokemon[] {
    const stored = localStorage.getItem(this.localStorageKey);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (error) {
        console.error('Error parsing local pokemon hunt data:', error);
        return [];
      }
    }
    return [];
  }

  /**
   * Persists registered Pokémon to localStorage.
   */
  private saveToLocalStorage(registeredPokemon: RegisteredPokemon[]): void {
    try {
      localStorage.setItem(this.localStorageKey, JSON.stringify(registeredPokemon));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }

  private setLastSync(): void {
    localStorage.setItem(this.lastSyncKey, new Date().toISOString());
  }

  /**
   * Returns the timestamp of the last successful sync, if any.
   */
  getLastSync(): Date | null {
    const lastSync = localStorage.getItem(this.lastSyncKey);
    return lastSync ? new Date(lastSync) : null;
  }

  /**
   * Returns whether data should be synced again (stale after 5 minutes).
   */
  needsSync(): boolean {
    const lastSync = this.getLastSync();
    if (!lastSync) return true;

    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    return lastSync < fiveMinutesAgo;
  }
}
