import { Routes } from '@angular/router';
import {CardListComponent} from './components/card/card-list/card-list.component';
import {CardEditComponent} from './components/card/card-edit/card-edit.component';

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
    path: 'card/add',
    component: CardEditComponent,
  },
  {
    path: 'card/edit/:id',
    component: CardEditComponent,
  },
  {
    path: '**',
    redirectTo: 'card/list',
    pathMatch: 'full'
  }
];
