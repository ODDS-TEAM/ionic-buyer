import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../shared/models/User.model';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private http: HttpClient,
    private storage: StorageService,
    private auth: AuthService
  ) { }

  getProfile() {
    return new Promise<User>((resolve, reject) => {
      this.storage.getUserInfo().then(storageUser => {
        this.http.get<User>(`${environment.apiURL}/customer/profile/${storageUser.uid}`).subscribe(
          userGot => {
            this.storage.setUserInfo(userGot).then(() => {
              resolve(userGot);
            }).catch(err => reject(err));
          }
        );
      });
    });
  }

  updateProfile(displayName: string, email: string) {
    return new Promise((resolve, reject) => {
      this.storage.getUserInfo().then(storageUser => {
        this.http.post(`${environment.apiURL}/customer/profile/edit/${storageUser.uid}`,
        { displayName, email }, { observe: 'response' }).subscribe(
          res => {
            resolve();
          }, err => {
            if (err.status === 401) {
              reject('Email is already in used');
            }
            reject(err);
          }
        );
      });
    });
  }

  uploadProfilePicture(imgBlob: Blob) {
    const formData = new FormData();
    formData.append('imgRaw', imgBlob);
    return new Promise((resolve, reject) => {
      this.storage.getUserInfo().then(storageUser => {
        this.http.request('POST', `${environment.apiURL}/upload/img/customer/${storageUser.uid}`,
        { observe: 'response', body: formData })
        .subscribe( res => {
          resolve(res);
        }, err => {
          reject('Got problem while upload profile image');
        });
      });
    });
  }
}
