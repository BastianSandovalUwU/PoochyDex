import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
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
   * Obtiene los pokemon registrados del backend
   * Si el usuario no está autenticado, devuelve los datos del localStorage
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
        // Si falla, devolver datos locales
        return of(this.getLocalRegisteredPokemon());
      })
    );
  }

  /**
   * Guarda los pokemon registrados en el backend
   * Si el usuario no está autenticado, solo guarda en localStorage
   */
  saveRegisteredPokemon(registeredPokemon: RegisteredPokemon[]): Observable<PokemonHuntResponse> {
    // Siempre guardar en localStorage como backup
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
        // Aunque falle el servidor, los datos ya están en localStorage
        return of({
          success: false,
          message: 'Saved locally but failed to sync with server'
        });
      })
    );
  }

  /**
   * Actualiza los pokemon registrados (parcialmente)
   * Útil para actualizaciones incrementales
   */
  updateRegisteredPokemon(registeredPokemon: RegisteredPokemon[]): Observable<PokemonHuntResponse> {
    // Siempre actualizar localStorage
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
   * Elimina todos los pokemon registrados
   */
  clearRegisteredPokemon(): Observable<PokemonHuntResponse> {
    // Limpiar localStorage
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
   * Sincroniza los datos locales con el servidor
   * Útil después de iniciar sesión
   */
  syncWithServer(): Observable<PokemonHuntResponse> {
    if (!this.authService.isAuthenticated()) {
      return of({
        success: false,
        message: 'User not authenticated'
      });
    }

    const localData = this.getLocalRegisteredPokemon();

    // Si hay datos locales, intentar subirlos al servidor
    if (localData.length > 0) {
      return this.saveRegisteredPokemon(localData);
    }

    // Si no hay datos locales, intentar obtener del servidor
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
   * Obtiene los pokemon registrados del localStorage
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
   * Guarda los pokemon registrados en el localStorage
   */
  private saveToLocalStorage(registeredPokemon: RegisteredPokemon[]): void {
    try {
      localStorage.setItem(this.localStorageKey, JSON.stringify(registeredPokemon));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }

  /**
   * Marca la última sincronización
   */
  private setLastSync(): void {
    localStorage.setItem(this.lastSyncKey, new Date().toISOString());
  }

  /**
   * Obtiene la fecha de la última sincronización
   */
  getLastSync(): Date | null {
    const lastSync = localStorage.getItem(this.lastSyncKey);
    return lastSync ? new Date(lastSync) : null;
  }

  /**
   * Verifica si los datos necesitan sincronización
   */
  needsSync(): boolean {
    const lastSync = this.getLastSync();
    if (!lastSync) return true;

    // Considerar que necesita sync si pasaron más de 5 minutos
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    return lastSync < fiveMinutesAgo;
  }
}

