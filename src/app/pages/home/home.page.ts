import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {

  username: string;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.username = 'Teema';
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
