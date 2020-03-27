import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Table } from 'src/app/shared/models/CoEating.model';
import { CoEatingService } from 'src/app/services/co-eating/co-eating.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.page.html',
  styleUrls: ['./table-view.page.scss'],
})
export class TableViewPage implements OnInit {

  tableDetail: Table;
  isLeader = false;
  uid: string;

  constructor(
    private router: Router,
    private coEating: CoEatingService,
    private storage: StorageService
  ) {
    const extras = this.router.getCurrentNavigation().extras;
    if (extras && extras.state) {
      this.tableDetail = this.router.getCurrentNavigation().extras.state.tableDetail;
    }

    this.storage.getUserInfo().then(cacheUser => {
      this.uid = cacheUser.uid;
    });
  }

  ngOnInit() {
    this.checkLeader();
    this.addFakeData();
  }

  addFakeData() {
    const a: Table = {
      _id: '5e7e31d49cf8d683b2854b95',
      leaderId: '5e2a8c1514cb0b21b926dcf4',
      tableName: 'test',
      restaurantName: 'ลุงธีเอง',
      merchantId: '5e2a8800ecd19a20cc1290f5',
      inviteCode: '0859gt',
      state: 'ordering',
      baskets: [{
        customerId: '5e2a8c1514cb0b21b926dcf4',
        items: [{
          options: ['a', 'b'],
          dayMenuId: 'test',
          foodName: 'test',
          numberOfItem: 4,
          price: 23,
          imageUrl: 'test',
          specialInstruction: 'spicy',
        }, {
          options: ['d', 'e'],
          dayMenuId: 'test',
          foodName: 'test2',
          numberOfItem: 5,
          price: 20,
          imageUrl: 'test',
          specialInstruction: 'spicy',
        }]
      }, {
        customerId: '1234',
        items: []
      }],
    };
    this.tableDetail = a;
  }

  async checkLeader() {
    const cacheUser = await this.storage.getUserInfo();
    this.isLeader = cacheUser.uid === this.tableDetail.leaderId;
  }

  order() {

  }

  onPressEditBasket(index: number) {

  }

  onPressRefresh() {
    this.coEating.getTableDetail(this.tableDetail._id).subscribe(
      res => {
        this.tableDetail = res;
      }, err => {
        console.error(err);
      }
    );
  }
}
