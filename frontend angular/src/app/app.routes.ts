import { Routes } from '@angular/router';
import {CardListComponent} from './components/card/card-list/card-list.component';
import {CardEditComponent} from './components/card/card-edit/card-edit.component';
import {CardDetailComponent} from './components/card/card-detail/card-detail.component';
import {CartPageComponent} from './components/cart/cart-page/cart-page.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'card/list',
    pathMatch: 'full'
  },
  {
    path: 'card/list',
    component: CardListComponent
  },
  {
    path: 'card/detail/:id',
    component: CardDetailComponent
  },
  {
    path: 'card/add',
    component: CardEditComponent,
  },
  {
    path: 'card/edit/:id',
    component: CardEditComponent,
  },
  {
    path: 'cart',
    component: CartPageComponent
  },
  {
    path: '**',
    redirectTo: 'card/list',
    pathMatch: 'full'
  }
];
