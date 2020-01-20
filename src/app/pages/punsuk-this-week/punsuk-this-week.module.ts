import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PunsukThisWeekPageRoutingModule } from './punsuk-this-week-routing.module';

import { PunsukThisWeekPage } from './punsuk-this-week.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PunsukThisWeekPageRoutingModule
  ],
  declarations: [PunsukThisWeekPage]
})
export class PunsukThisWeekPageModule {}
