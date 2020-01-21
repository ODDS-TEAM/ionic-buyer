import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { ConfirmModalPage } from './confirm-modal/confirm-modal.page';
import { OverlayEventDetail } from '@ionic/core';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.page.html',
  styleUrls: ['./basket.page.scss'],
})
export class BasketPage implements OnInit {

  totalPrice = 80;

  constructor(
    private modalController: ModalController,
    private popoverController: PopoverController
  ) { }

  ngOnInit() {
    this.orderNow();
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

    popover.onDidDismiss().then((res: OverlayEventDetail) => {
      console.log(res);
    });
  }

}
