import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TableViewPageRoutingModule } from './table-view-routing.module';

import { TableViewPage } from './table-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TableViewPageRoutingModule
  ],
  declarations: [TableViewPage]
})
export class TableViewPageModule {}
