import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-activity',
  templateUrl: 'activity.page.html',
  styleUrls: ['activity.page.scss']
})
export class ActivityPage implements OnInit {

  isLoading = true;
  loading: HTMLIonLoadingElement;

  constructor(
    private loadingController: LoadingController
  ) {}

  ngOnInit(): void {
    this.presentLoading()
      .then(() => {
        // Normally call api and then dismiss
        setTimeout(() => this.loading.dismiss(), 5000);
    }).catch(err => {
      console.log(err);
    });
  }

  getActivityList(event?) {

  }

  async openActivityModal(index: number) {

  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Loading',
      spinner: 'bubbles'
    });
    await loading.present();
    this.loading = loading;
  }

}
