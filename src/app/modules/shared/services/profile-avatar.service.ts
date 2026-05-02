import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageKeys } from '../../../../../entities/common/enum';

export interface DefaultAvatar {
  id: string;
  label: string;
  url: string;
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

/** Stored value: a default avatar ID (e.g. 'trainer-red') or a base64 data-URL for custom uploads. */
@Injectable({ providedIn: 'root' })
export class ProfileAvatarService {

  private avatarSubject = new BehaviorSubject<string | null>(this.readAvatar());

  avatar$ = this.avatarSubject.asObservable();

  getAvatar(): string | null {
    return this.avatarSubject.getValue();
  }

  /** Returns the resolved image URL regardless of whether it's a default ID or a base64 string. */
  getAvatarUrl(): string | null {
    const value = this.getAvatar();
    if (!value) return null;
    if (value.startsWith('data:')) return value;
    const match = DEFAULT_AVATARS.find(a => a.id === value);
    return match?.url ?? null;
  }

  setDefaultAvatar(id: string): void {
    localStorage.setItem(LocalStorageKeys.PROFILE_AVATAR, id);
    this.avatarSubject.next(id);
  }

  setCustomAvatar(base64: string): void {
    localStorage.setItem(LocalStorageKeys.PROFILE_AVATAR, base64);
    this.avatarSubject.next(base64);
  }

  clearAvatar(): void {
    localStorage.removeItem(LocalStorageKeys.PROFILE_AVATAR);
    this.avatarSubject.next(null);
  }

  private readAvatar(): string | null {
    return localStorage.getItem(LocalStorageKeys.PROFILE_AVATAR);
  }
}
