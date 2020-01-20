import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PunsukPage } from './punsuk.page';

const routes: Routes = [
  {
    path: '',
    component: PunsukPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PunsukPageRoutingModule {}
