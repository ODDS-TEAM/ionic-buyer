import { Component, OnInit } from '@angular/core';
import { ApiCallerService } from 'src/app/services/api-caller.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-lunch-this-week',
  templateUrl: './lunch-this-week.page.html',
  styleUrls: ['./lunch-this-week.page.scss'],
})
export class LunchThisWeekPage implements OnInit {

  loading: HTMLIonLoadingElement;

  menus = {
    mon: [],
    tue: [],
    wed: [],
    thu: [],
    fri: [],
  };

  constructor(
    private apiCaller: ApiCallerService,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.presentLoading();
    this.apiCaller.getWeekMenus().then((res: any) => {
      this.menus = res;
      this.loading.dismiss();
    });
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
