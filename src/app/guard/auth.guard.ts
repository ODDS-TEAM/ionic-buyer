import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(public auth: AuthService, private router: Router) { }

  canActivate(): Promise<boolean> {
    // return new Promise<boolean>((resolve) => resolve(true));
    return new Promise<boolean>((resolve, reject) => {
      if (this.auth.isLogin()) {
        resolve(true);
      } else {
        this.router.navigate(['/login']);
        reject(false);
      }
    });
  }
}
