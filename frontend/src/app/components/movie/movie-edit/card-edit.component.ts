import {Component, inject, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {ServiceMovieService} from '../../../service/service-card.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-movie-edit',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './card-edit.component.html',
  styleUrl: './card-edit.component.css'
})
export class MovieEditComponent implements OnInit{
  @Input("id") id!:string;
  editar = false;
  genreList: string[] = [];

  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  private readonly movieService: ServiceMovieService = inject(ServiceMovieService);
  private readonly router : Router = inject(Router);

  formMovie : FormGroup = this.formBuilder.group({
    _id: [],
    title: ['', [Validators.required,
    Validators.minLength(2),
    Validators.maxLength(200)]],
    year: [ new Date().getFullYear(), [
      Validators.required,
      Validators.min(1800),
      Validators.max(new Date().getFullYear())]],
    director: ['', [Validators.required,
      Validators.minLength(2),
      Validators.maxLength(500)]],
    plot: ['', [Validators.required,
      Validators.minLength(2),
      Validators.maxLength(500)]],
    genres: [], //null => []
    poster: ['', [Validators.required,
      Validators.minLength(2),
      Validators.maxLength(500)]],
    imdb: this.formBuilder.group({
      rating: [0,  [
        Validators.required,
        Validators.min(0),
        Validators.max(10)]],
      votes: [0,  [
        Validators.required,
        Validators.min(0)]],
    })
  })

  myNewGenres: FormGroup = this.formBuilder.group({
    newGenre:['']
  });


  ngOnInit(): void {
    this.loadMovie();
  }

  get title():any {
    return this.formMovie.get('title');
  }
  get year():any {
    return this.formMovie.get('year');
  }
  get director():any {
    return this.formMovie.get('director');
  }
  get plot():any {
    return this.formMovie.get('plot');
  }
  get genres():any {
    return this.formMovie.get('genres');
  }
  get poster():any {
    return this.formMovie.get('poster');
  }
  get rating():any {
    return this.formMovie.get('imdb.rating');
  }
  get votes():any {
    return this.formMovie.get('imdb.votes');
  }

  get newGenre():any {
    return this.myNewGenres.get('newGenre');
  }

  private loadMovie() {
    if (this.id) {
      //editamos peli, rellenamos el formulario
      this.editar = true;
      this.movieService.getMovie(this.id).subscribe({
        next:(data)=>{
          this.formMovie.setValue(data.status) //
        },
        error:(err)=>{
          console.error('Error loading movie', err);
        },
        complete:()=>{
          console.log('Movie loaded successfully');
        }
      })
    }
    else {
      //creamos peli nueva, vaciamos campos
      this.formMovie.reset();
      this.editar = false;
    }
    this.movieService.getGenres().subscribe({
      next:(data)=>{
        this.genreList = data.status
      }
    })
  }

  addMovie() {
    if (this.editar && this.formMovie.valid){
      //editar pelicula
      this.movieService.updateMovie(this.formMovie.getRawValue()).subscribe(
        {
          next:(data)=>{
            console.log('Movie updated successfully', data);
            //  console.log(this.formMovie.getRawValue());
             this.router.navigate(['/movies/list'])
            //redirige a la lista de peliculas (componente MovieList) luego de actualizar
          },
          error:(err)=>{
            console.error('Error updating movie', err);
          },
          complete:()=> {
            console.log('Update movie request completed');
          }
        }
      )
    } else
    if (!this.editar && this.formMovie.valid)
    {
      //añadir pelicula
      this.movieService.addMovie(this.formMovie.getRawValue()).subscribe(
        {
          next:(data)=>{
            console.log('Movie added successfully', data);
            this.router.navigate(['/movies/list'])
            //redirige a la lista de peliculas (componente MovieList) luego de actualizar
          },
          error:(err)=>{
            console.error('Error updating movie', err);
          },
          complete:()=> {
            console.log('Update movie request completed');
          }
        }
      )
    }
  }

  addNewGenre() {
    let newGenre;  // obtenemos los géneros actuales
    if (!newGenre){
      newGenre = [];
    }
    if(!this.editar){
      this.genreList.push(this.myNewGenres.value)
    } else{
      newGenre = this.genres.value;
      newGenre.push(this.newGenre.value) // añadimos el nuevo género
      this.genreList.push(this.newGenre.value);
      this.formMovie.setControl('genres', new FormControl(newGenre)); // actualizamos el control 'genres' del formulario
    }
    this.myNewGenres.reset() // limpiamos el campo del nuevo género
  }
}

// agregar al final la validacion para que solo se pueda enviar en caso de
// que el formulario sea valido (formMovie.valid)
