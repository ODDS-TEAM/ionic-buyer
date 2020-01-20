import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PunsukThisWeekPage } from './punsuk-this-week.page';

const routes: Routes = [
  {
    path: '',
    component: PunsukThisWeekPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PunsukThisWeekPageRoutingModule {}
