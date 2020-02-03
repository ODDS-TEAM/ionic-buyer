import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivityPage } from './activity.page';
import { ActivityDetailPageModule } from './activity-detail/activity-detail.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: ActivityPage }]),
    ActivityDetailPageModule
  ],
  declarations: [ActivityPage]
})
export class ActivityPageModule {}
