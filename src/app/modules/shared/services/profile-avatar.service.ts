import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'environments/environment';
import { LocalStorageKeys } from '../../../../../entities/common/enum';
import { UserData } from '../../../../../entities/auth/user.entity';

export interface DefaultAvatar {
  id: string;
  label: string;
  url: string;
}

interface UploadProfileImageResponse {
  success: boolean;
  data: { profileImgUrl: string };
}

const AVATAR_BASE = 'assets/images/avatars';

export const DEFAULT_AVATARS: DefaultAvatar[] = [
  { id: 'trainer-red',     label: 'Red',     url: `${AVATAR_BASE}/red.png` },
  { id: 'trainer-leaf',    label: 'Leaf',    url: `${AVATAR_BASE}/leaf.png` },
  { id: 'trainer-ethan',   label: 'Ethan',   url: `${AVATAR_BASE}/ethan.png` },
  { id: 'trainer-kris',    label: 'Kris',    url: `${AVATAR_BASE}/kris.png` },
  { id: 'trainer-brendan', label: 'Brendan', url: `${AVATAR_BASE}/brendan.png` },
  { id: 'trainer-may',     label: 'May',     url: `${AVATAR_BASE}/may.png` },
  { id: 'trainer-lucas',   label: 'Lucas',   url: `${AVATAR_BASE}/lucas.png` },
  { id: 'trainer-dawn',    label: 'Dawn',    url: `${AVATAR_BASE}/dawn.png` },
  { id: 'trainer-hilbert', label: 'Hilbert', url: `${AVATAR_BASE}/hilbert.png` },
  { id: 'trainer-hilda',   label: 'Hilda',   url: `${AVATAR_BASE}/hilda.png` },
  { id: 'trainer-elio',    label: 'Elio',    url: `${AVATAR_BASE}/elio.png` },
  { id: 'trainer-selene',  label: 'Selene',  url: `${AVATAR_BASE}/selene.png` },
  { id: 'trainer-victor',  label: 'Victor',  url: `${AVATAR_BASE}/victor.png` },
  { id: 'trainer-gloria',  label: 'Gloria',  url: `${AVATAR_BASE}/gloria.png` },
  { id: 'trainer-calem',   label: 'Calem',   url: `${AVATAR_BASE}/calem.png` },
  { id: 'trainer-serena',  label: 'Serena',  url: `${AVATAR_BASE}/serena.png` },
];

/**
 * Avatar priority (highest to lowest):
 * 1. profileAvatar key → default trainer ID (e.g. 'trainer-red')
 * 2. sessionData.profileImgUrl → S3 presigned URL stored on login/upload
 */
@Injectable({ providedIn: 'root' })
export class ProfileAvatarService {

  private readonly apiUrl = environment.nodeJsApi;
  private avatarSubject = new BehaviorSubject<string | null>(this.readAvatar());

  avatar$ = this.avatarSubject.asObservable();

  constructor(private http: HttpClient) {}

  getAvatar(): string | null {
    return this.avatarSubject.getValue();
  }

  /** Returns the resolved URL for display. */
  getAvatarUrl(): string | null {
    const value = this.getAvatar();
    if (!value) return null;
    if (value.startsWith('http') || value.startsWith('data:')) return value;
    return DEFAULT_AVATARS.find(a => a.id === value)?.url ?? null;
  }

  /** Selects a default bundled trainer avatar. */
  setDefaultAvatar(id: string): void {
    localStorage.setItem(LocalStorageKeys.PROFILE_AVATAR, id);
    this.avatarSubject.next(id);
  }

  /**
   * Stores an S3/CDN presigned URL in sessionData so it persists with the session.
   * Also emits to update subscribers immediately.
   */
  setProfileImgUrl(url: string): void {
    this.writeSessionProfileImgUrl(url);
    this.avatarSubject.next(url);
  }

  /** Fetches a fresh presigned URL from the API and updates sessionData. */
  refreshProfileImageUrl(): Observable<UploadProfileImageResponse> {
    return this.http
      .get<UploadProfileImageResponse>(`${this.apiUrl}/api/auth/profile/image`)
      .pipe(
        tap(response => {
          if (response.success) {
            this.setProfileImgUrl(response.data.profileImgUrl);
          }
        })
      );
  }

  /** Deletes the user's S3 profile image via the API and clears the stored URL. */
  deleteProfileImage(): Observable<{ success: boolean }> {
    return this.http
      .delete<{ success: boolean }>(`${this.apiUrl}/api/auth/profile/image`)
      .pipe(
        tap(response => {
          if (response.success) {
            this.writeSessionProfileImgUrl('');
            // Only clear subject if no manual avatar is selected
            if (!localStorage.getItem(LocalStorageKeys.PROFILE_AVATAR)) {
              this.avatarSubject.next(null);
            }
          }
        })
      );
  }

  /** Uploads image to S3 via the API and stores the returned presigned URL. */
  uploadProfileImage(file: File): Observable<UploadProfileImageResponse> {
    const formData = new FormData();
    formData.append('image', file);
    return this.http
      .patch<UploadProfileImageResponse>(`${this.apiUrl}/api/auth/profile/image`, formData)
      .pipe(
        tap(response => {
          if (response.success) {
            this.setProfileImgUrl(response.data.profileImgUrl);
          }
        })
      );
  }

  clearAvatar(): void {
    localStorage.removeItem(LocalStorageKeys.PROFILE_AVATAR);
    this.avatarSubject.next(null);
  }

  private readAvatar(): string | null {
    // Manual selection (default trainer ID) takes priority
    const manual = localStorage.getItem(LocalStorageKeys.PROFILE_AVATAR);
    if (manual) return manual;
    // Fall back to S3 URL stored in session
    return this.readSessionProfileImgUrl();
  }

  private readSessionProfileImgUrl(): string | null {
    try {
      const raw = localStorage.getItem(LocalStorageKeys.SESSION_DATA);
      if (!raw) return null;
      const session = JSON.parse(raw) as UserData;
      return session.profileImgUrl ?? null;
    } catch {
      return null;
    }
  }

  private writeSessionProfileImgUrl(url: string): void {
    try {
      const raw = localStorage.getItem(LocalStorageKeys.SESSION_DATA);
      if (!raw) return;
      const session = JSON.parse(raw) as UserData;
      localStorage.setItem(LocalStorageKeys.SESSION_DATA, JSON.stringify({ ...session, profileImgUrl: url }));
    } catch { /* noop */ }
  }
}
