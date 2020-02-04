import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-activity-detail',
  templateUrl: './activity-detail.page.html',
  styleUrls: ['./activity-detail.page.scss'],
})
export class ActivityDetailPage implements OnInit {

  chipColor = 'successgreen';
  statusText = 'Cooking done';

  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {
    // setTimeout(() => this.modalController.dismiss(), 3000);
  }

  closeModal() {
    this.modalController.dismiss();
  }

}
