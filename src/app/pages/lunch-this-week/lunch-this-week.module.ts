import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LunchThisWeekPageRoutingModule } from './lunch-this-week-routing.module';

import { LunchThisWeekPage } from './lunch-this-week.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LunchThisWeekPageRoutingModule
  ],
  declarations: [LunchThisWeekPage]
})
export class LunchThisWeekPageModule {}
