import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ActivityDetail } from 'src/app/shared/models/ActivityDetail.model';

@Component({
  selector: 'app-activity-detail',
  templateUrl: './activity-detail.page.html',
  styleUrls: ['./activity-detail.page.scss'],
})
export class ActivityDetailPage implements OnInit {

  @Input() activityDetail: ActivityDetail;

  totalPrice: number;

  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.calculateTotalPrice();
    // setTimeout(() => this.modalController.dismiss(), 3000);
  }

  toThaiTime(date) {
    console.log(typeof(date));
    console.log(date);
  }

  closeModal() {
    this.modalController.dismiss();
  }

  calculateTotalPrice() {
    this.totalPrice = 0;
    this.activityDetail.items.forEach(ele => {
      this.totalPrice += ele.numberOfItem * ele.price;
    });
  }

  getBadgeColor(state: string) {
    switch (state) {
      case 'wc': return 'waitinggray';
      case 'cf': return 'successgreen';
      case 'cd': return 'gprimary';
    }
  }

  getBadgeText(state: string) {
    switch (state) {
      case 'wc': return 'Waiting for confirmation';
      case 'cf': return 'Order confirmed';
      case 'cd': return 'Ready to deliver';
    }
  }

}
