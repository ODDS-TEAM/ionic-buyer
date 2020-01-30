import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { MailCredentials } from '../shared/models/MailCredentials.model';
import { HttpClient } from '@angular/common/http';
import { User } from '../shared/models/User.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = 'http://103.74.254.74:3000';

  private loggedIn = false;

  private POST = 'POST';

  private OK_STATUS = 200;
  private CREATED_OK_STATUS = 201;
  private ERR_STATUS = 401;

  private authenticationState = new BehaviorSubject(false);

  constructor(private storageService: StorageService, private httpClient: HttpClient) { }

  isLogin() {
    return this.authenticationState.value;
  }

  relogin() {
    return new Promise<boolean>((resolve, reject) => {
      this.storageService.getCredentialsInfo()
        .then((res: MailCredentials) => {
          this.login(res)
            .then(() => resolve(true))
            .catch(() => resolve(false));
          console.log(res);
        })
        .catch(err => reject(false));
    });
  }

  saveProfile(user: User, mailCredentials: MailCredentials) {
    this.storageService.setUserInfo(user);
    this.storageService.setCredentialsInfo(mailCredentials);
  }

  login(credentials: MailCredentials) {
    return new Promise((resolve, reject) => {
      this.fetchAPI(this.POST, '/auth/customer/login', credentials)
        .subscribe(
          (res: User) => {
            resolve(res);
            this.saveProfile(res, credentials);
            this.authenticationState.next(true);
          },
          err => {
            if (err.status === this.ERR_STATUS) {
              reject(err);
            } else {
              reject(err);
            }
          }
        );
    });
  }

  signUp(email: string, password: string, displayName: string) {
    return new Promise((resolve, reject) => {
      this.fetchAPI(this.POST, '/auth/customer/signup', { email, password, displayName })
        .subscribe(
          (res: User) => {
            resolve(res);
            this.saveProfile(res, new MailCredentials({ email: res.email, password }));
          },
          err => {
            if (err.status === this.ERR_STATUS) {
              reject(err);
            }
          }
        );
    });
  }

  signOut() {
    this.storageService.emptyCredentialsInfo()
      .then(res => console.log(res)).catch(err => console.log(err));
    this.authenticationState.next(false);
  }

  fetchAPI(method: string, path: string, body: any) {
    return this.httpClient.post(`${this.URL}${path}`, body, {
      headers: {
        'Content-Type': 'application/json'
      },
    });
  }
}
