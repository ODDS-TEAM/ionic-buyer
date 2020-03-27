import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateTablePageRoutingModule } from './create-table-routing.module';

import { CreateTablePage } from './create-table.page';
import { SelectRestaurantComponent } from './select-restaurant/select-restaurant.component';
import { RestaurantMenuComponent } from './select-restaurant/restaurant-menu/restaurant-menu.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateTablePageRoutingModule
  ],
  declarations: [CreateTablePage, SelectRestaurantComponent, RestaurantMenuComponent],
  entryComponents: [SelectRestaurantComponent, RestaurantMenuComponent]
})
export class CreateTablePageModule {}
