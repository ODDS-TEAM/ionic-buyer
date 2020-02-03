import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { ActivityDetailPage } from './activity-detail/activity-detail.page';

@Component({
  selector: 'app-activity',
  templateUrl: 'activity.page.html',
  styleUrls: ['activity.page.scss']
})
export class ActivityPage implements OnInit {

  isLoading = true;
  loading: HTMLIonLoadingElement;

  constructor(
    private loadingController: LoadingController,
    private modalController: ModalController,
  ) {}

  ngOnInit(): void {
    this.presentLoading()
      .then(loading => {
        // Normally call api and then dismiss
        setTimeout(() => loading.dismiss(), 300);
        this.openActivityModal(1);
    }).catch(err => {
      console.log(err);
    });
  }

  getActivityList(event?) {

  }

  async openActivityModal(index: number) {
    const modal = await this.modalController.create({
      component: ActivityDetailPage,
      componentProps: {
        activityDetail: null
      }
    });

    modal.onDidDismiss().then(res => {
      // Do something after modal dismiss
    }).catch(err => console.log(err))
    .finally(() => {

    });

    await modal.present();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Loading',
      spinner: 'bubbles'
    });
    await loading.present();
    return loading;
  }

}
