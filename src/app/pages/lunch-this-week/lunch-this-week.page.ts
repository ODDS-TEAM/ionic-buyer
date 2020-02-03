import { Component, OnInit } from '@angular/core';
import { ApiCallerService } from 'src/app/services/api-caller.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-lunch-this-week',
  templateUrl: './lunch-this-week.page.html',
  styleUrls: ['./lunch-this-week.page.scss'],
})
export class LunchThisWeekPage implements OnInit {

  isLoading = true;

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
    this.presentLoading().then(loading => {
      this.apiCaller.getWeekMenus().then((res: any) => {
        this.menus = res;
      }).catch(err => console.log(err))
      .finally(() => {
        loading.dismiss();
        this.isLoading = false;
      });
    });
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
