import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { OptionsPage } from './options/options.page';
import { OverlayEventDetail } from '@ionic/core';
import { BasketPage } from './basket/basket.page';

@Component({
  selector: 'app-food',
  templateUrl: './food.page.html',
  styleUrls: ['./food.page.scss'],
})
export class FoodPage implements OnInit {

  cart = [];

  constructor(private router: Router, private modalController: ModalController) { }

  ngOnInit() {
    // this.goToFoodOption();
    this.goToBasketView();
  }

  async goToFoodOption() {
    const modal = await this.modalController.create({
      component: OptionsPage
    });

    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
      if (detail == null) {
        return;
      }
    });

    await modal.present();
  }

  async goToBasketView() {
    const modal = await this.modalController.create({
      component: BasketPage
    });

    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
      if (detail == null) {
        return;
      }
    });
    await modal.present();
  }

}
