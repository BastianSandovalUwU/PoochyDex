import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DEFAULT_AVATARS, DefaultAvatar, ProfileAvatarService } from 'app/modules/shared/services/profile-avatar.service';
import { AuthService } from 'app/modules/auth/services/auth.service';

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

  uploadFile: File | null = null;
  uploadPreview: string | null = null;
  uploadError = false;

  uploading = false;
  deleting = false;
  uploadApiError = false;
  deleteApiError = false;

  /** true when user has an S3 image and picked a default avatar (pending confirmation) */
  showDeleteConfirm = false;
  /** default avatar ID waiting to be applied after S3 image is deleted */
  private pendingDefaultId: string | null = null;

  get isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  /** Whether the current user has an S3-hosted profile image */
  get hasS3Image(): boolean {
    const url = this.avatarService.getAvatarUrl();
    return !!url && url.startsWith('http');
  }

  constructor(
    private avatarService: ProfileAvatarService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    const current = this.avatarService.getAvatar();
    if (current && !current.startsWith('data:') && !current.startsWith('http')) {
      this.selectedDefaultId = current;
    }
  }

  selectTab(tab: PickerTab): void {
    this.activeTab = tab;
    this.showDeleteConfirm = false;
    this.pendingDefaultId = null;
  }

  selectDefault(id: string): void {
    this.selectedDefaultId = id;
    this.showDeleteConfirm = false;
    this.pendingDefaultId = null;
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    this.uploadError = false;
    this.uploadApiError = false;
    this.uploadPreview = null;
    this.uploadFile = null;

    if (!file) return;
    if (!file.type.startsWith('image/')) {
      this.uploadError = true;
      return;
    }

    this.uploadFile = file;
    const reader = new FileReader();
    reader.onload = () => { this.uploadPreview = reader.result as string; };
    reader.readAsDataURL(file);
  }

  canSave(): boolean {
    if (this.uploading || this.deleting) return false;
    if (this.activeTab === 'default') return !!this.selectedDefaultId;
    return !!this.uploadFile;
  }

  save(): void {
    if (!this.canSave()) return;

    if (this.activeTab === 'default' && this.selectedDefaultId) {
      // If user has an S3 image, ask for confirmation before deleting it
      if (this.isLoggedIn && this.hasS3Image) {
        this.pendingDefaultId = this.selectedDefaultId;
        this.showDeleteConfirm = true;
        return;
      }
      this.applyDefaultAvatar(this.selectedDefaultId);
      return;
    }

    if (this.activeTab === 'upload' && this.uploadFile) {
      if (this.isLoggedIn) {
        this.saveViaApi(this.uploadFile);
      } else {
        this.avatarService.setProfileImgUrl(this.uploadPreview!);
        this.avatarSaved.emit();
      }
    }
  }

  confirmDeleteAndApplyDefault(): void {
    if (!this.pendingDefaultId) return;
    this.deleting = true;
    this.deleteApiError = false;

    this.avatarService.deleteProfileImage().subscribe({
      next: () => {
        this.deleting = false;
        this.showDeleteConfirm = false;
        this.applyDefaultAvatar(this.pendingDefaultId!);
        this.pendingDefaultId = null;
      },
      error: () => {
        this.deleting = false;
        this.deleteApiError = true;
      },
    });
  }

  cancelDeleteConfirm(): void {
    this.showDeleteConfirm = false;
    this.pendingDefaultId = null;
  }

  deleteImage(): void {
    this.deleting = true;
    this.deleteApiError = false;

    this.avatarService.deleteProfileImage().subscribe({
      next: () => {
        this.deleting = false;
        this.avatarSaved.emit();
      },
      error: () => {
        this.deleting = false;
        this.deleteApiError = true;
      },
    });
  }

  private applyDefaultAvatar(id: string): void {
    this.avatarService.setDefaultAvatar(id);
    this.avatarSaved.emit();
  }

  private saveViaApi(file: File): void {
    this.uploading = true;
    this.uploadApiError = false;

    this.avatarService.uploadProfileImage(file).subscribe({
      next: () => {
        this.uploading = false;
        this.avatarSaved.emit();
      },
      error: () => {
        this.uploading = false;
        this.uploadApiError = true;
      },
    });
  }
}
