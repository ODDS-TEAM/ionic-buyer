import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.page.html',
  styleUrls: ['./confirm-modal.page.scss'],
})
export class ConfirmModalPage implements OnInit {

  constructor(
    private popoverController: PopoverController,
  ) { }

  ngOnInit() {
  }

  cancel() {
    this.popoverController.dismiss();
  }

  order() {
    this.popoverController.dismiss('complete');
  }

}
