import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActivityDetailPage } from './activity-detail.page';
import { TimeAgoThaiPipeModule } from 'src/app/pipes/timeAgoThai/time-ago-thai.pipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TimeAgoThaiPipeModule
  ],
  declarations: [ActivityDetailPage],
  entryComponents: [ActivityDetailPage]
})
export class ActivityDetailPageModule {}
