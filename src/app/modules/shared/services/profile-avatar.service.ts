import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageKeys } from '../../../../../entities/common/enum';

export interface DefaultAvatar {
  id: string;
  label: string;
  url: string;
}

export const DEFAULT_AVATARS: DefaultAvatar[] = [
  { id: 'trainer-red',     label: 'Red',     url: 'https://raw.githubusercontent.com/msikma/pokesprite/master/trainers/red.png' },
  { id: 'trainer-leaf',    label: 'Leaf',    url: 'https://raw.githubusercontent.com/msikma/pokesprite/master/trainers/leaf.png' },
  { id: 'trainer-ethan',   label: 'Ethan',   url: 'https://raw.githubusercontent.com/msikma/pokesprite/master/trainers/ethan.png' },
  { id: 'trainer-kris',    label: 'Kris',    url: 'https://raw.githubusercontent.com/msikma/pokesprite/master/trainers/kris.png' },
  { id: 'trainer-brendan', label: 'Brendan', url: 'https://raw.githubusercontent.com/msikma/pokesprite/master/trainers/brendan.png' },
  { id: 'trainer-may',     label: 'May',     url: 'https://raw.githubusercontent.com/msikma/pokesprite/master/trainers/may.png' },
  { id: 'trainer-lucas',   label: 'Lucas',   url: 'https://raw.githubusercontent.com/msikma/pokesprite/master/trainers/lucas.png' },
  { id: 'trainer-dawn',    label: 'Dawn',    url: 'https://raw.githubusercontent.com/msikma/pokesprite/master/trainers/dawn.png' },
  { id: 'trainer-hilbert', label: 'Hilbert', url: 'https://raw.githubusercontent.com/msikma/pokesprite/master/trainers/hilbert.png' },
  { id: 'trainer-hilda',   label: 'Hilda',   url: 'https://raw.githubusercontent.com/msikma/pokesprite/master/trainers/hilda.png' },
  { id: 'trainer-calem',   label: 'Calem',   url: 'https://raw.githubusercontent.com/msikma/pokesprite/master/trainers/calem.png' },
  { id: 'trainer-serena',  label: 'Serena',  url: 'https://raw.githubusercontent.com/msikma/pokesprite/master/trainers/serena.png' },
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
