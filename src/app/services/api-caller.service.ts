import { Injectable } from '@angular/core';
import dayMenus from './json-mock/dayMenus.js';
import { HttpClient } from '@angular/common/http';
import { WeekMenu } from '../shared/models/WeekMenus.model.js';

@Injectable({
  providedIn: 'root'
})
export class ApiCallerService {

  WEB_SERVICE_URL = `http://103.74.254.74:3000`;
  FOOD_URL = `${this.WEB_SERVICE_URL}/customer/food`;
  WEEK_URL = `${this.FOOD_URL}/week`;

  constructor(
    private http: HttpClient
  ) { }

  getWeekLunchImage() {
    // tslint:disable-next-line: variable-name
    const _this = this;
    return new Promise((resolve, reject) => {
      this.http.request<WeekMenu[]>('GET', this.WEEK_URL, {
        observe: 'response'
      }).subscribe(
        res => {
          resolve(this.toImageUrlArray(res.body));
        }, err => {
          if (err === 401) {
            resolve(this.toImageUrlArray([]));
          }
          reject();
        }
      );
    });
  }

  getWeekMenus() {
    // tslint:disable-next-line: variable-name
    const _this = this;
    return new Promise((resolve, reject) => {
      this.http.request<WeekMenu[]>('GET', this.WEEK_URL, {
        observe: 'response'
      }).subscribe(
        res => {
          resolve(this.toObjectDay(res.body));
        }, err => {
          if (err === 401) {
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

  getTodayMenus() {
  }

}
