import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StorageService } from '../storage.service';
import { environment } from 'src/environments/environment';
import { CreateTableRequest, Restaurant, RestaurantMenu, Table } from 'src/app/shared/models/CoEating.model';

@Injectable({
  providedIn: 'root'
})
export class CoEatingService {

  constructor(
    private http: HttpClient,
    private storage: StorageService
  ) { }

  getRestaurantMenus(merchantId: string) {
    return this.http.get<RestaurantMenu[]>(`${environment.apiURL}/customer/table/menu/${merchantId}`, { observe: 'response' }).toPromise();
  }

  getRestaurantList() {
    return this.http.get<Restaurant[]>(`${environment.apiURL}/customer/table/restaurant`).toPromise();
  }

  createTable(tableName: string, restaurantName: string, merchantId: string) {
    return new Promise<Table>((resolve, reject) => {
      this.getUserId().then(userId => {
        const body: CreateTableRequest = {
          leaderId: userId,
          tableName,
          restaurantName,
          merchantId
        };
        this.http.post<Table>(`${environment.apiURL}/customer/table/create`, body, { observe: 'response' })
          .subscribe(
            res => {
              resolve(res.body);
            }, err => {
              reject(err);
            }
          );
      });
    });
  }

  getUserId() {
    return new Promise<string>((resolve, reject) => {
      this.storage.getUserInfo().then(user => {
        resolve(user.uid);
      });
    });
  }

  getTableDetail(tableId: string) {
    return this.http.get<Table>(`${environment.apiURL}/customer/table/view/${tableId}`);
  }
}
