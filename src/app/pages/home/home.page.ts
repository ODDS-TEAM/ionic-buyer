import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiCallerService } from 'src/app/services/api-caller.service';
import { StorageService } from 'src/app/services/storage.service';
import { ActionSheetController, AlertController, ToastController } from '@ionic/angular';
import { Button } from 'protractor';

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
    private storage: StorageService,
    private actionSheetController: ActionSheetController,
    private alertController: AlertController,
    private toastController: ToastController
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

  goToLunchThisWeek() {
    this.router.navigate(['/lunch-this-week']);
  }

  validateCode(code: string) {
    return true;
  }

  onPressCreateTable() {
    this.router.navigate(['/create-table']);
  }

  async onPressJoin(code: string) {
    if (!this.validateCode(code)) {
      (await this.toastController.create({
        message: 'Code is invalid format'
      })).present();
    }
    /**
     * TODO:
     * call api to join table
     * if response is ok
     * route to table
     * if error
     * toast present code is not match any table
     */
  }

  async onPressJoinTable() {
    const alert = await this.alertController.create({
      header: 'Enter table code',
      inputs: [
        {
          name: 'code',
          type: 'text',
          placeholder: 'xxxxxx',
        }
      ],
      buttons: [
        {
          text: 'Join',
          handler: value => this.onPressJoin(value.code)
        }, {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'color-danger'
        }
      ]
    });

    await alert.present();
  }

  onPressMyTable() {

  }

  async onPressCoEating() {
    const actionSheet = await this.actionSheetController.create({
      buttons: [
        {
          text: 'Create Table',
          handler: () => this.onPressCreateTable()
        }, {
          text: 'Join Table',
          handler: () => this.onPressJoinTable()
        }, {
          text: 'My Table',
          handler: () => this.onPressMyTable()
        }, {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'color-danger'
        }
      ]
    });
    await actionSheet.present();
  }

}
