import {Component, inject, Input, OnInit} from '@angular/core';
import {ServiceMovieService} from '../../../service/service-card.service';
import {Movie} from '../../../common/interface-card';
import {RouterLink} from '@angular/router';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {faTrashCan} from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-movie-list',
  imports: [
    RouterLink,
    FaIconComponent
  ],
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.css'
})
export class MovieListComponent {
  private readonly movieService: ServiceMovieService = inject(ServiceMovieService);
  movies: Movie[] = [];
  constructor() {
    this.loadMovies();
  }

  private loadMovies() {
    this.movieService.getMovies().subscribe(
      {
        next: data =>{
          this.movies = data.status;
        },
        error: err =>{
          console.error('Error carga de movies:', err);
        },
        complete:() =>{
          console.log('Movie List cargada correctamente');
        }
      }
    )
  }

  protected readonly faTrashCan = faTrashCan;

  deleteMovie(movie: Movie) {
    if (confirm('Desea eliminar la pelicula?' + movie.title + '?')) {
      this.movieService.deleteMovie(movie._id).subscribe({
        next: (data) => {
          console.log('Pelicula eliminada:', data);
          this.loadMovies();
        },
        error: (err) => {
          console.error('Error eliminando la pelicula:', err);
        }
      });
    }
  }
}
