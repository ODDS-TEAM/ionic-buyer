import { Component, OnInit } from '@angular/core';
import { Restaurant } from 'src/app/shared/models/CoEating.model';
import { ModalController } from '@ionic/angular';
import { SelectRestaurantComponent } from './select-restaurant/select-restaurant.component';
import { OverlayEventDetail } from '@ionic/core';
import { CoEatingService } from 'src/app/services/co-eating/co-eating.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-table',
  templateUrl: './create-table.page.html',
  styleUrls: ['./create-table.page.scss'],
})
export class CreateTablePage implements OnInit {

  tableName = '';
  selectedRestaurant: Restaurant;

  constructor(
    private modalController: ModalController,
    private coeating: CoEatingService,
    private router: Router
  ) { }

  ngOnInit() {}

  async openSelectRestaurantModal() {
    const modal = await this.modalController.create({
      component: SelectRestaurantComponent,
      componentProps: {
        selectedRestaurant: this.selectedRestaurant
      }
    });

    modal.onDidDismiss().then((eventDetail: OverlayEventDetail) => {
      if (eventDetail.role === 'change') {
        this.selectedRestaurant = eventDetail.data;
      }
    });

    await modal.present();
  }

  onPressRestaurant() {
    this.openSelectRestaurantModal();
  }

  onPressCreate() {
    this.coeating.createTable(this.tableName, this.selectedRestaurant.restaurantName, this.selectedRestaurant.merchantId)
      .then(table => {
        this.router.navigate(['/table-view'], { replaceUrl: true, state: { tableDetail: table }});
      })
      .catch(err => console.error(err));
  }

}
