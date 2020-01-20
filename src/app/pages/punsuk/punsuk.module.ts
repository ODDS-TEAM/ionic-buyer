import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PunsukPageRoutingModule } from './punsuk-routing.module';

import { PunsukPage } from './punsuk.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PunsukPageRoutingModule
  ],
  declarations: [PunsukPage]
})
export class PunsukPageModule {}
