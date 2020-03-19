import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiCallerService } from 'src/app/services/api-caller.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {

  lunchThisWeekImg = [];

  username: string;

  constructor(
    private router: Router,
    private apiCaller: ApiCallerService,
    private storage: StorageService
  ) {}

  async ngOnInit() {
    this.getDisplayName();
    this.apiCaller.getWeekLunchImage().then((res: any) => {
      this.lunchThisWeekImg = res;
    });
  }

  async getDisplayName() {
    const userInfo = await this.storage.getUserInfo();
    this.username = userInfo.displayName;
  }

  goToFood() {
    this.router.navigate(['/food']);
  }

  goToPunsuk() {
    this.router.navigate(['/punsuk']);
  }

  goToLunchThisWeek() {
    this.router.navigate(['/lunch-this-week']);
  }

  goToPunsukThisWeek() {
    this.router.navigate(['/punsuk-this-week']);
  }

}
