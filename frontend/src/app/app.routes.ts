import { Routes } from '@angular/router';
import {MovieListComponent} from './components/movie/movie-list/card-list.component';
import {MovieEditComponent} from './components/movie/movie-edit/card-edit.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'movies',
    pathMatch: 'full'
  },
  {
    path: 'movies/list',
    component: MovieListComponent
  },
  {
    path: 'movies/add',
    component: MovieEditComponent,
  },
  {
    path: 'movies/edit/:id',
    component: MovieEditComponent,
  },
  {
    path: '**',
    redirectTo: 'movies',
    pathMatch: 'full'
  }
];
