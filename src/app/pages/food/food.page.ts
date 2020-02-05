import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, AlertController, LoadingController } from '@ionic/angular';
import { OptionsPage } from './options/options.page';
import { OverlayEventDetail } from '@ionic/core';
import { BasketPage } from './basket/basket.page';
import { DayMenus } from 'src/app/shared/models/DayMenus.model';
import { ApiCallerService } from 'src/app/services/api-caller.service';
import { BasketItem } from 'src/app/shared/models/Basket.model';
import { BasketService } from 'src/app/services/basket.service';


@Component({
  selector: 'app-food',
  templateUrl: './food.page.html',
  styleUrls: ['./food.page.scss'],
})
export class FoodPage implements OnInit {

  cart = [];
  dayMenus: DayMenus[] = [];

  loading: HTMLIonLoadingElement;

  isLoading = true;

  constructor(
    private router: Router,
    private modalController: ModalController,
    private api: ApiCallerService,
    private loadingController: LoadingController,
    public basket: BasketService,
    private alertController: AlertController,
  ) { }

  ngOnInit() {
    this.presentLoading().then(loading => {
      this.api.getTodayMenus()
        .then(res => {
          this.dayMenus = res;
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          loading.dismiss();
          this.isLoading = false;
        });
    }).catch(err => console.log(err));
    // this.goToBasketView();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Loading',
      spinner: 'bubbles'
    });
    await loading.present();
    return loading;
  }

  async goToFoodOption(restaurantIndex: number, menuIndex: number) {
    const restaurant = this.dayMenus[restaurantIndex];
    const merchantId = restaurant.merchantId;
    const restaurantName = restaurant.restaurantName;
    const menu = restaurant.menus[menuIndex];

    const loading = await this.loadingController.create({
      spinner: 'bubbles'
    });
    await loading.present();

    const foodDetail = await this.api.getFoodDetail('5e2acbbd62ba053e15f58056');

    const modal = await this.modalController.create({
      component: OptionsPage,
      componentProps: {
        foodDetail,
        menu,
        merchantId,
        restaurantName,
      }
    });

    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
      if (detail == null) {
        return;
      }
    });

    await loading.dismiss();

    await modal.present();
  }

  async goToBasketView() {
    const modal = await this.modalController.create({
      component: BasketPage
    });

    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
      if (!detail.data) {
        return;
      } else {
        if (detail.role === 'activity') {
          this.router.navigate(['/main/activity'], { queryParams: { openActivityDetail: true, activityId: detail.data }});
        }
      }
    });
    await modal.present();
  }

  async presentAlertConfirm(
    header: string,
    message: string,
    cancelText: string,
    okText: string,
    basketItem: BasketItem,
    changeMerchant: boolean,
    merchantId: string,
    merchantName: string) {

    const alert = await this.alertController.create({
      header,
      message,
      buttons: [
        {
          text: cancelText,
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: okText,
          handler: async () => {
            if (changeMerchant) {
              await this.basket.newBasket();
              this.basket.setCurrentMerchant(merchantId, merchantName);
            }
            this.addMenuToBasket(basketItem);
          }
        }
      ]
    });

    await alert.present();
  }

  async onPressMenu(restaurantIndex: number, menuIndex: number) {
    console.log(this.dayMenus[restaurantIndex]);
    const merchantId = this.dayMenus[restaurantIndex].merchantId;
    const merchantName = this.dayMenus[restaurantIndex].restaurantName;
    const restaurant = this.dayMenus[restaurantIndex];
    const menu = restaurant.menus[menuIndex];
    const basketItem = {
      dayMenuId: menu._id,
      foodName: menu.menuName,
      numberOfItem: 1,
      price: menu.price,
      imageUrl: menu.imageUrl,
      options: [],
      specialInstruction: ''
    };
    if (this.basket.isSameMerchant(merchantId)) {
      console.log('same merchant');
      this.presentAlertConfirm(
        'เพิ่มอาหารลงตะกร้า',
        'คุณต้องการเพิ่มอาหารลงตะกร้าใช่หรือไม่',
        'ไม่',
        'ใช่ ฉันต้องการเพิ่มอาหาร',
        basketItem,
        false,
        merchantId,
        merchantName
      );
    } else if (!this.basket.hasItem()) {
      console.log('new item on basket');
      this.presentAlertConfirm(
        'เพิ่มอาหารลงตะกร้า',
        'คุณต้องการเพิ่มอาหารลงตะกร้าใช่หรือไม่',
        'ไม่',
        'ใช่ ฉันต้องการเพิ่มอาหาร',
        basketItem,
        true,
        merchantId,
        merchantName
      );
    } else {
      console.log('change merchant');
      this.presentAlertConfirm(
        'เปลี่ยนร้านค้า',
        'คุณต้องการจะเปลี่ยนร้านค้าและเพิ่มลงตะกร้าใช่หรือไม่',
        'ไม่',
        'ใช่ ฉันต้องการเปลี่ยนร้านอาหาร',
        basketItem,
        true,
        merchantId,
        merchantName
      );
    }
  }

  async addMenuToBasket(basketItem: BasketItem) {
    try {
      this.basket.addBasketItem(basketItem);
    } catch (err) {
      throw err;
    }
  }

}
