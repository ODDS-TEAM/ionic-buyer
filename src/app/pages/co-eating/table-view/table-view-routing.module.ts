import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TableViewPage } from './table-view.page';

const routes: Routes = [
  {
    path: '',
    component: TableViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TableViewPageRoutingModule {}
