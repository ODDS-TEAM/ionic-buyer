import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { ConfirmModalPage } from './confirm-modal/confirm-modal.page';
import { OverlayEventDetail } from '@ionic/core';
import { BasketService } from 'src/app/services/basket.service';
import { Basket } from 'src/app/shared/models/Basket.model';
import { ApiCallerService } from 'src/app/services/api-caller.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.page.html',
  styleUrls: ['./basket.page.scss'],
})
export class BasketPage implements OnInit {

  COMPLETE = 'complete';

  totalPrice: number;
  basket: Basket;

  constructor(
    private modalController: ModalController,
    private popoverController: PopoverController,
    private basketService: BasketService,
    private apiCaller: ApiCallerService
  ) { }

  ngOnInit() {
    this.basket = this.basketService.getBasket();
    this.updatePrice();
  }

  updatePrice() {
    if (this.basket.items.length === 0) {
      this.modalController.dismiss();
    }
    this.totalPrice = 0;
    for (const item of this.basket.items) {
      this.totalPrice += item.price * item.numberOfItem;
    }
  }

  removeItem(index: number) {
    this.basketService.removeBasketItem(index);
    this.updatePrice();
  }

  cancelModal() {
    this.modalController.dismiss();
  }

  async orderNow() {
    const popover = await this.popoverController.create({
      component: ConfirmModalPage,
      showBackdrop: true,
      backdropDismiss: false,
      animated: false,
      cssClass: 'confirm-popover'
    });

    popover.style.margin = 'auto';
    popover.style.backgroundColor = 'rgba(0, 0, 0, 0.29)';
    popover.style['--width'] = '80%';

    await popover.present();

    popover.onDidDismiss().then(async (res: OverlayEventDetail) => {
      if (res.data === this.COMPLETE) {
        try {
          const bRes: any = await this.apiCaller.orderBasket(this.basket);
          console.log('order res', bRes);
          await this.basketService.newBasket();
          await this.modalController.dismiss(bRes._id, 'activity');
        } catch (err) {
          console.log(err);
        }
      }
    });
  }

}
