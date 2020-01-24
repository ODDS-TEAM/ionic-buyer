import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})
export class ProfilePage {

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  onPressSignOut() {
    this.authService.signOut();
    this.router.navigate(['/'], { replaceUrl: true });
  }

}
