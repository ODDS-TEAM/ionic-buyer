import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WeekMenu } from '../shared/models/WeekMenus.model.js';
import { DayMenus } from '../shared/models/DayMenus.model.js';
import { BasketService } from './basket.service.js';
import { Basket } from '../shared/models/Basket.model.js';

@Injectable({
  providedIn: 'root'
})
export class ApiCallerService {

  WEB_SERVICE_URL = `http://103.74.254.74:3000`;
  FOOD_URL = `${this.WEB_SERVICE_URL}/customer/food`;
  WEEK_URL = `${this.FOOD_URL}/week`;
  TODAY_URL = `${this.FOOD_URL}/today`;
  ORDER_URL = `${this.FOOD_URL}/order`;

  constructor(
    private http: HttpClient,
  ) { }

  getWeekLunchImage() {
    return new Promise((resolve, reject) => {
      this.http.request<WeekMenu[]>('GET', this.WEEK_URL, {
        observe: 'response'
      }).subscribe(
        res => {
          console.log(res.body);
          resolve(this.toImageUrlArray(res.body));
        }, err => {
          if (err.status === 401) {
            resolve([]);
          }
          reject();
        }
      );
    });
  }

  getWeekMenus() {
    return new Promise((resolve, reject) => {
      this.http.request<WeekMenu[]>('GET', this.WEEK_URL, {
        observe: 'response'
      }).subscribe(
        res => {
          resolve(this.toObjectDay(res.body));
        }, err => {
          if (err.status === 401) {
            resolve(this.toObjectDay([]));
          }
          reject();
        }
      );
    });
  }

  toImageUrlArray(arr: WeekMenu[]) {
    const ret = [];
    for (const menu of arr) {
      ret.push(menu.imageUrl);
    }
    return ret;
  }

  toObjectDay(arr: WeekMenu[]) {
    const resData = {
      mon: [],
      tue: [],
      wed: [],
      thu: [],
      fri: [],
    };

    for (const menu of arr) {
      switch (menu.day) {
        case 'mon':
          resData.mon.push(menu);
          break;
        case 'tue':
          resData.tue.push(menu);
          break;
        case 'wed':
          resData.wed.push(menu);
          break;
        case 'thu':
          resData.thu.push(menu);
          break;
        case 'fri':
          resData.fri.push(menu);
          break;
        default:
      }
    }

    return resData;
  }

  getTodayMenus(): Promise<DayMenus[]> {
    return new Promise((resolve, reject) => {
      this.http.request<DayMenus[]>('GET', this.TODAY_URL, {
        observe: 'response'
      }).subscribe(
        res => {
          resolve(res.body);
        }, err => {
          if (err.status === 401) {
            resolve([]);
          }
          reject(err);
        }
      );
    });
  }

  orderBasket(basket: Basket) {
    return new Promise((resolve, reject) => {
      this.http.request('POST', this.ORDER_URL, {
        observe: 'response',
        body: basket
      }).subscribe(
        res => {
          resolve(res.body);
        }, err => {
          reject(err);
        }
      );
    });
  }

}
