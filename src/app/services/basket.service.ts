import { Injectable } from '@angular/core';
import { Basket, BasketItem } from '../shared/models/Basket.model';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  basket: Basket;

  constructor(
    private storage: StorageService
  ) {
  }

  getNumberOfItem() {
    return this.basket.items.length;
  }

  hasItem() {
    return this.basket.items.length !== 0;
  }

  getBasket() {
    return this.basket;
  }

  getBasketItem(index: number) {
    return this.basket[index];
  }

  async newBasket() {
    const user = await this.storage.getUserInfo();
    this.setBasket({
      customerId: user.uid,
      customerName: user.displayName,
      customerImageUrl: 'https://i.pinimg.com/736x/4a/05/53/4a0553a2d29ce2857ed2c002cec15ecc.jpg',
      merchantId: '',
      orderType: 'food',
      merchantName: '',
      paymentMethod: 'Cash',
      items: []
    });
  }

  addBasketItem(basketItem: BasketItem) {
    this.basket.items.push(basketItem);
  }

  removeBasketItem(index: number) {
    this.basket.items.splice(index, 1);
  }

  setBasket(basket: Basket) {
    this.basket = basket;
  }

  setPaymentMethod(paymentMethod: string) {
    this.basket.paymentMethod = paymentMethod;
  }

  isSameMerchant(merchantId: string) {
    return merchantId === this.basket.merchantId;
  }

  setCurrentMerchant(merchantId: string, merchantName: string) {
    this.basket.merchantId = merchantId;
    this.basket.merchantName = merchantName;
  }
}
