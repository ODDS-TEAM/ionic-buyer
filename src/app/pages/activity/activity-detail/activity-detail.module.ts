import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActivityDetailPage } from './activity-detail.page';
import { TimeAgoThaiPipe } from 'src/app/pipes/timeAgoThai/time-ago-thai.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  declarations: [ActivityDetailPage, TimeAgoThaiPipe],
  entryComponents: [ActivityDetailPage]
})
export class ActivityDetailPageModule {}
