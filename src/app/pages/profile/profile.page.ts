import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { StorageService } from 'src/app/services/storage.service';
import { User } from 'src/app/shared/models/User.model';
import { LoadingController } from '@ionic/angular';
import { ProfileService } from 'src/app/services/profile.service';
import { LunchThisWeekPageModule } from '../lunch-this-week/lunch-this-week.module';

import { Plugins, CameraResultType, FilesystemDirectory } from '@capacitor/core';

const { CapCamera, Filesystem, Camera } = Plugins;

@Component({
  selector: 'app-tab3',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})
export class ProfilePage implements OnInit {

  editMode = false;

  displayNameFormControl: FormControl;
  displayNameFromApi: string;

  emailFormControl: FormControl;
  emailFromApi: string;

  selectImageUrl: string;

  constructor(
    private router: Router,
    private authService: AuthService,
    private profileService: ProfileService,
    private storage: StorageService,
    private loadingController: LoadingController,
  ) { }

  async ngOnInit() {
    this.initialForm();
    const loading = await this.presentLoading();
    try {
      await this.initialProfileInfo();
    } catch (err) {
      console.error(err);
    } finally {
      loading.dismiss();
    }
  }

  initialProfileInfo() {
    return new Promise((resolve, reject) => {
      this.profileService.getProfile().then(
        user => {
          this.displayNameFormControl.setValue(user.displayName);
          this.emailFormControl.setValue(user.email);
          this.displayNameFromApi = user.displayName;
          this.emailFromApi = user.email;
          this.selectImageUrl = user.imageUrl;
          resolve();
        }, err => {
          reject(err);
        }
      );
    });
  }

  initialForm() {
    this.displayNameFormControl = new FormControl('', [Validators.required]);
    this.emailFormControl = new FormControl('', [Validators.email, Validators.required]);
  }

  async onPressProfilePicture() {
    const image = await Camera.getPhoto({
      resultType: CameraResultType.DataUrl,
    });

    this.selectImageUrl = image.dataUrl;
  }

  onClickEditProfile() {
    this.toggleEditMode();
  }

  async onClickUpdateProfile() {
    const loading = await this.presentLoading();
    try {
      const user = await this.profileService.updateProfile(this.displayNameFormControl.value, this.emailFormControl.value);
      const imgBlob = this.base64toBlob(this.selectImageUrl);
      await this.profileService.uploadProfilePicture(imgBlob);
    } catch (err) {
      console.error(err);
    } finally {
      await this.initialProfileInfo();
      loading.dismiss();
      this.toggleEditMode();
    }
  }

  onClickCancel() {
    this.toggleEditMode();
    this.displayNameFormControl.setValue(this.displayNameFromApi);
    this.emailFormControl.setValue(this.emailFromApi);
  }

  onPressSignOut() {
    this.authService.signOut().then(() => {
      this.router.navigate(['/login'], { replaceUrl: true });
    });
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  base64toBlob(base64Url: string): Blob {
    const mimeType = base64Url.split(',')[0].split(';')[0].split(':')[1];
    const data = base64Url.split(',')[1];

    const byte = atob(data);
    const ab = new ArrayBuffer(byte.length);
    const ia = new Uint8Array(ab);

    for (let i = 0; i < byte.length; i++) {
      ia[i] = byte.charCodeAt(i);
    }

    return new Blob([ab], { type: mimeType });
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      spinner: 'bubbles',
      mode: 'ios',
      backdropDismiss: false,
    });
    await loading.present();
    return loading;
  }

}
