import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-options',
  templateUrl: './options.page.html',
  styleUrls: ['./options.page.scss'],
})
export class OptionsPage implements OnInit {

  foodTitle: string;

  basePrice = 65;
  calculatedPrice: number;

  totalNumber = 1;
  totalPrice: number;

  constructor(private modalController: ModalController) { }

  ngOnInit() {
    this.foodTitle = 'สุนัขยิ้ม';
    this.calculatedPrice = this.basePrice;
    this.updateTotalPrice();
  }

  updateNumber(add: number) {
    if (this.totalNumber + add === 0) {
      return;
    }
    this.totalNumber += add;
    this.updateTotalPrice();
  }

  updateTotalPrice() {
    this.totalPrice = this.totalNumber * this.calculatedPrice;
  }

  addToBasket() {
    this.modalController.dismiss(this.totalPrice);
  }

  cancelModal() {
    this.modalController.dismiss(null);
  }

}
