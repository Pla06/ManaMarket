import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {InterfaceMovie, InterfaceMovies, Movie} from '../common/interface-movie';

@Injectable({
  providedIn: 'root'
})
export class ServiceMovieService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly URL_Base: string = 'http://localhost:3000/api/v1/movies/';

  constructor() { }
  //todas las peliculas
  getMovies():Observable<InterfaceMovies>{
    return this.http.get<InterfaceMovies>(this.URL_Base)
  }
  //una pelicula
  getMovie(id: string):Observable<InterfaceMovie>{
    return this.http.get<InterfaceMovie>(this.URL_Base+ 'movie/'+ id)
  }
  //nuevas funciones para el CRUD

  //añadir pelicula
  addMovie(movie:Movie): Observable<ApiResponse>{
    return this.http.post<ApiResponse>(this.URL_Base, movie)
  }
  //editar pelicula
  updateMovie(movie: Movie):Observable<ApiResponse>{
    return this.http.put<ApiResponse>(this.URL_Base+ movie._id, movie);
    //localhost:3000/api/movies/movie/6321f4e2e4b0f5b1c4d6a7e9
  }
  //eliminar pelicula
  deleteMovie(id:string):Observable<ApiResponse>{
    return this.http.delete<ApiResponse>(this.URL_Base + id);
  }

  getGenres():Observable<ApiResponseGenres>{
    return this.http.get<ApiResponseGenres>(this.URL_Base + 'genres')
  }
}

export interface ApiResponse{
  status: string;
}

export interface ApiResponseGenres{
  status: string[];
}
