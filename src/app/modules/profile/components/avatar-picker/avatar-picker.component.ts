import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DEFAULT_AVATARS, DefaultAvatar, ProfileAvatarService } from 'app/modules/shared/services/profile-avatar.service';

type PickerTab = 'default' | 'upload';

@Component({
  selector: 'app-avatar-picker',
  templateUrl: './avatar-picker.component.html',
  styleUrls: ['./avatar-picker.component.scss']
})
export class AvatarPickerComponent implements OnInit {

  @Input() language = 'es';
  @Output() avatarSaved = new EventEmitter<void>();

  readonly defaultAvatars: DefaultAvatar[] = DEFAULT_AVATARS;

  activeTab: PickerTab = 'default';
  selectedDefaultId: string | null = null;
  uploadPreview: string | null = null;
  uploadError = false;
  saving = false;

  constructor(private avatarService: ProfileAvatarService) {}

  ngOnInit(): void {
    const current = this.avatarService.getAvatar();
    if (current && !current.startsWith('data:')) {
      this.selectedDefaultId = current;
    }
  }

  selectTab(tab: PickerTab): void {
    this.activeTab = tab;
  }

  selectDefault(id: string): void {
    this.selectedDefaultId = id;
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    this.uploadError = false;
    this.uploadPreview = null;

    if (!file) return;

    if (!file.type.startsWith('image/')) {
      this.uploadError = true;
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      this.uploadPreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  canSave(): boolean {
    if (this.activeTab === 'default') return !!this.selectedDefaultId;
    return !!this.uploadPreview;
  }

  save(): void {
    if (!this.canSave()) return;
    if (this.activeTab === 'default' && this.selectedDefaultId) {
      this.avatarService.setDefaultAvatar(this.selectedDefaultId);
    } else if (this.activeTab === 'upload' && this.uploadPreview) {
      this.avatarService.setCustomAvatar(this.uploadPreview);
    }
    this.avatarSaved.emit();
  }
}
