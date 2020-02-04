import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: '',
    // loadChildren: () => import('./auth/login/login.module').then( m => m.LoginPageModule)
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
  },
  {
    path: 'main',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'lunch-this-week',
    loadChildren: () => import('./pages/lunch-this-week/lunch-this-week.module').then( m => m.LunchThisWeekPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'punsuk-this-week',
    loadChildren: () => import('./pages/punsuk-this-week/punsuk-this-week.module').then( m => m.PunsukThisWeekPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'food',
    loadChildren: () => import('./pages/food/food.module').then( m => m.FoodPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'punsuk',
    loadChildren: () => import('./pages/punsuk/punsuk.module').then( m => m.PunsukPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'register',
    loadChildren: () => import('./auth/register/register.module').then( m => m.RegisterPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
