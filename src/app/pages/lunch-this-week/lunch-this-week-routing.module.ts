import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LunchThisWeekPage } from './lunch-this-week.page';

const routes: Routes = [
  {
    path: '',
    component: LunchThisWeekPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LunchThisWeekPageRoutingModule {}
