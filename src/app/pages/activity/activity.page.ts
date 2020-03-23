import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { ActivityDetailPage } from './activity-detail/activity-detail.page';
import { ApiCallerService } from 'src/app/services/api-caller.service';
import { Activity } from 'src/app/shared/models/Activity.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-activity',
  templateUrl: 'activity.page.html',
  styleUrls: ['activity.page.scss']
})
export class ActivityPage implements OnInit {

  activityList: Activity[] = [];

  isLoading = true;
  loading: HTMLIonLoadingElement;

  constructor(
    private loadingController: LoadingController,
    private modalController: ModalController,
    private api: ApiCallerService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.presentLoading().then(loading => {
      this.getActivityList().then(() => {
        loading.dismiss();
      });
    });
  }

  onPressHistoryButton() {
    this.routeToHistoryPage();
  }

  routeToHistoryPage() {
    this.router.navigate(['/history']);
  }

  getBadgeColor(state: string) {
    switch (state) {
      case 'wc': return 'waitinggray';
      case 'cf': return 'successgreen';
      case 'cd': return 'gprimary';
    }
  }

  getBadgeText(state: string) {
    switch (state) {
      case 'wc': return 'Waiting for confirmation';
      case 'cf': return 'Order confirmed';
      case 'cd': return 'Ready to deliver';
    }
  }

  async getActivityList(event?) {
    this.isLoading = true;
    this.activityList = await this.api.getActivityList();
    this.isLoading = false;
    if (event) {
      event.target.complete();
    }
  }

  async openActivityModal(index: number) {
    const loading = await this.presentLoading();
    const activityDetail = await this.api.getActivityDetail(this.activityList[index]._id);
    const modal = await this.modalController.create({
      component: ActivityDetailPage,
      componentProps: {
        activityDetail
      }
    });

    modal.onDidDismiss().then(res => {
      // Do something after modal dismiss
    }).catch(err => console.log(err))
    .finally(() => {
    });
    await loading.dismiss();
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
