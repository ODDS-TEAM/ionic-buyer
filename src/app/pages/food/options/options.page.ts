import { Component, OnInit, Input } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { FoodDetail } from 'src/app/shared/models/FoodDetail.model';
import { Menu } from 'src/app/shared/models/DayMenus.model';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { BasketService } from 'src/app/services/basket.service';
import { BasketItem } from 'src/app/shared/models/Basket.model';

@Component({
  selector: 'app-options',
  templateUrl: './options.page.html',
  styleUrls: ['./options.page.scss'],
})
export class OptionsPage implements OnInit {

  @Input() foodDetail: FoodDetail;
  @Input() menu: Menu;
  @Input() merchantId: string;
  @Input() restaurantName: string;

  basePrice: number;
  calculatedPrice: number;

  totalNumber = 1;
  totalPrice: number;

  selectedChoices = [];

  fg: FormGroup;

  constructor(
    private modalController: ModalController,
    private alertController: AlertController,
    private formBuilder: FormBuilder,
    private basketService: BasketService,
  ) { }

  ngOnInit() {
    this.basePrice = this.foodDetail.price;
    this.calculatedPrice = this.basePrice;
    this.updateTotalPrice();

    this.fg = this.formBuilder.group({
      specialInstruction: ['']
    });

    for (const i of this.foodDetail.options) {
      const a = [];
      for (const j of i.choices) {
        a.push(false);
      }
      this.selectedChoices.push(a);
    }

    console.log(this.selectedChoices);
    console.log({ foodDetail: this.foodDetail, menu: this.menu, restaurantName: this.restaurantName });
  }

  joinChoiceToStringArray() {
    const arr = [];
    for (let i = 0; i < this.selectedChoices.length; i++) {
      for (let j = 0; j < this.selectedChoices[i].length; j++) {
        if (this.selectedChoices[i][j]) {
          arr.push(this.foodDetail.options[i].choices[j].titleChoice);
        }
      }
    }
    return arr;
  }

  async updateCalculatedPrice() {
    let sum = 0;
    for (let i = 0; i < this.selectedChoices.length; i++) {
      for (let j = 0; j < this.selectedChoices[i].length; j++) {
        if (this.selectedChoices[i][j]) {
          sum += this.foodDetail.options[i].choices[j].priceChoice;
        }
      }
    }
    sum += this.basePrice;
    this.calculatedPrice = sum;
    this.updateTotalPrice();
  }

  onRadioButtonChange(event, optionIndex: number, choiceIndex: number) {
    this.falseAllChoice(optionIndex);
    this.selectChoice(optionIndex, choiceIndex);
    this.updateCalculatedPrice();
  }

  onPressCheckbox(event: CustomEvent, optionIndex: number, choiceIndex: number) {
    if (event.detail.checked) {
      this.selectChoice(optionIndex, choiceIndex);
    } else {
      this.unselectChoice(optionIndex, choiceIndex);
    }
    this.updateCalculatedPrice();
  }

  falseAllChoice(optionIndex: number) {
    const len = this.selectedChoices[optionIndex].length;
    for (let i = 0; i < len; i++) {
      this.selectedChoices[optionIndex][i] = false;
    }
  }

  selectChoice(optionIndex: number, choiceIndex: number) {
    this.selectedChoices[optionIndex][choiceIndex] = true;
  }

  unselectChoice(optionIndex: number, choiceIndex: number) {
    this.selectedChoices[optionIndex][choiceIndex] = false;
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

  buildBasketItem(): BasketItem {
    return {
      dayMenuId: this.menu._id,
      foodName: this.foodDetail.foodName,
      numberOfItem: this.totalNumber,
      price: this.calculatedPrice,
      imageUrl: this.foodDetail.imageUrl,
      options: this.joinChoiceToStringArray(),
      specialInstruction: this.fg.value.specialInstruction
    };
  }

  onPressAddToBasket() {
    if (this.basketService.isSameMerchant(this.merchantId)) {
      this.presentAlertConfirm(
        'เพิ่มอาหารลงตะกร้า',
        'คุณต้องการเพิ่มอาหารลงตะกร้าใช่หรือไม่',
        'ไม่',
        'ใช่ ฉันต้องการเพิ่มอาหาร',
        false
      );
    } else if (!this.basketService.hasItem()) {
      console.log('new item on basket');
      this.presentAlertConfirm(
        'เพิ่มอาหารลงตะกร้า',
        'คุณต้องการเพิ่มอาหารลงตะกร้าใช่หรือไม่',
        'ไม่',
        'ใช่ ฉันต้องการเพิ่มอาหาร',
        true
      );
    } else {
      this.presentAlertConfirm(
        'เปลี่ยนร้านค้า',
        'คุณต้องการจะเปลี่ยนร้านค้าและเพิ่มลงตะกร้าใช่หรือไม่',
        'ไม่',
        'ใช่ ฉันต้องการเปลี่ยนร้านอาหาร',
        true
      );
    }
  }

  async presentAlertConfirm(
    header: string,
    message: string,
    cancelText: string,
    okText: string,
    newBasket: boolean
    ) {

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
            if (newBasket) {
              await this.basketService.newBasket();
              this.basketService.setCurrentMerchant(this.merchantId, this.restaurantName);
            }
            this.addToBasket();
          }
        }
      ]
    });

    await alert.present();
  }

  addToBasket() {
    this.basketService.addBasketItem(this.buildBasketItem());
    this.modalController.dismiss(null, 'complete');
  }

  cancelModal() {
    this.modalController.dismiss(null);
  }

}
