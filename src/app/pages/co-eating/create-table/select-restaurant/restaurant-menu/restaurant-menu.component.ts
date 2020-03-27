import { Component, OnInit, Input } from '@angular/core';
import { RestaurantMenu } from 'src/app/shared/models/CoEating.model';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-restaurant-menu',
  templateUrl: './restaurant-menu.component.html',
  styleUrls: ['./restaurant-menu.component.scss'],
})
export class RestaurantMenuComponent implements OnInit {

  @Input() menuList: RestaurantMenu[];
  @Input() restaurantName: string;

  constructor(
    private popoverController: PopoverController
  ) { }

  ngOnInit() {
  }

  onPressClose() {
    this.popoverController.dismiss();
  }

  onPressConfirmRestaurant() {
    this.popoverController.dismiss(null, 'change');
  }

}
