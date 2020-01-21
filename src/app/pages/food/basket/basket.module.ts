import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BasketPage } from './basket.page';
import { ConfirmModalPageModule } from './confirm-modal/confirm-modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfirmModalPageModule
  ],
  declarations: [BasketPage],
  entryComponents: [BasketPage]
})
export class BasketPageModule {}
