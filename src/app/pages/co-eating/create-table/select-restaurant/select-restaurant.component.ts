import { Component, OnInit, Input } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { CoEatingService } from 'src/app/services/co-eating/co-eating.service';
import { RestaurantMenuComponent } from './restaurant-menu/restaurant-menu.component';
import { Restaurant } from 'src/app/shared/models/CoEating.model';
import { OverlayEventDetail } from '@ionic/core';

@Component({
  selector: 'app-select-restaurant',
  templateUrl: './select-restaurant.component.html',
  styleUrls: ['./select-restaurant.component.scss'],
})
export class SelectRestaurantComponent implements OnInit {

  @Input() selectedRestaurant: Restaurant;

  restaurantList: Restaurant[] = [];

  constructor(
    private popoverController: PopoverController,
    private modalController: ModalController,
    private coEating: CoEatingService
  ) { }

  ngOnInit() {
    this.coEating.getRestaurantList()
      .then(restaurantList => {
        this.restaurantList = restaurantList;
      }).catch(err => console.error());
  }

  isSelected(restaurant: Restaurant) {
    if (!this.selectedRestaurant) {
      return false;
    }
    return restaurant.merchantId === this.selectedRestaurant.merchantId;
  }

  async showMenuPopover(restaurant: Restaurant) {
    const menus = (await this.coEating.getRestaurantMenus(restaurant.merchantId)).body;
    const popover = await this.popoverController.create({
      component: RestaurantMenuComponent,
      componentProps: {
        menuList: menus,
        restaurantName: restaurant.restaurantName
      },
      cssClass: 'menu-list-popover'
    });
    popover.onDidDismiss().then((eventDetail: OverlayEventDetail) => {
      if (eventDetail.role === 'change') {
        this.modalController.dismiss(restaurant, eventDetail.role);
      }
    });
    popover.present();
  }

  onPressRestaurantItem(index: number) {
    this.showMenuPopover(this.restaurantList[index]);
  }

  onPressClose() {
    this.modalController.dismiss();
  }
}
