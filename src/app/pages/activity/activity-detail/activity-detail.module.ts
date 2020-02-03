import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActivityDetailPage } from './activity-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  declarations: [ActivityDetailPage],
  entryComponents: [ActivityDetailPage]
})
export class ActivityDetailPageModule {}
