import { Injectable } from '@angular/core';
import dayMenus from './json-mock/dayMenus.js';

@Injectable({
  providedIn: 'root'
})
export class ApiCallerService {

  constructor() { }

  getWeekLunchImage() {
    // tslint:disable-next-line: variable-name
    const _this = this;
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(_this.toImageUrlArray(dayMenus));
      }, 3000);
    });
  }

  getWeekMenus() {
    // tslint:disable-next-line: variable-name
    const _this = this;
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(_this.toObjectDay(dayMenus));
      }, 3000);
    });
  }

  toImageUrlArray(arr) {
    const ret = [];
    const len = arr.length;
    for (let i = 0; i < len; i++) {
      ret.push(arr[i].foodMenuItem.imgUrl);
    }
    return ret;
  }

  toObjectDay(arr) {
    const resData = {
      mon: [],
      tue: [],
      wed: [],
      thu: [],
      fri: [],
    };

    const len = arr.length;

    // tslint:disable-next-line: forin
    for (let i = 0; i < len; i++) {
      switch (arr[i].day) {
        case 'mon':
          resData.mon.push(arr[i]);
          break;
        case 'tue':
          resData.tue.push(arr[i]);
          break;
        case 'wed':
          resData.wed.push(arr[i]);
          break;
        case 'thu':
          resData.thu.push(arr[i]);
          break;
        case 'fri':
          resData.fri.push(arr[i]);
          break;
        default:
      }
    }

    return resData;
  }

  getTodayMenus() {
  }

}
