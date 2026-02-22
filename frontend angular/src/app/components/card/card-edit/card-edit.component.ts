import {Component, inject, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {ServiceCardService} from '../../../service/service-card.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-card-edit',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './card-edit.component.html',
  styleUrl: './card-edit.component.css'
})
export class CardEditComponent implements OnInit{
  @Input("id") id!:string;
  editar = false;
  genreList: string[] = [];

  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  private readonly cardService: ServiceCardService = inject(ServiceCardService);
  private readonly router : Router = inject(Router);
  private readonly route: ActivatedRoute = inject(ActivatedRoute);

  formCard : FormGroup = this.formBuilder.group({
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
    genres: [],
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
    this.id = this.route.snapshot.paramMap.get('id') ?? '';
    this.loadCard();
  }

  get title():any {
    return this.formCard.get('title');
  }
  get year():any {
    return this.formCard.get('year');
  }
  get director():any {
    return this.formCard.get('director');
  }
  get plot():any {
    return this.formCard.get('plot');
  }
  get genres():any {
    return this.formCard.get('genres');
  }
  get poster():any {
    return this.formCard.get('poster');
  }
  get rating():any {
    return this.formCard.get('imdb.rating');
  }
  get votes():any {
    return this.formCard.get('imdb.votes');
  }

  get newGenre():any {
    return this.myNewGenres.get('newGenre');
  }

  private loadCard() {
    if (this.id) {
      this.editar = true;
      this.cardService.getCard(this.id).subscribe({
        next:(data)=>{
          this.formCard.setValue(data.status)
        },
        error:(err)=>{
          console.error('Error loading card', err);
        },
        complete:()=>{
          console.log('Card loaded successfully');
        }
      })
    }
    else {
      this.formCard.reset();
      this.editar = false;
    }
    this.cardService.getCollections().subscribe({
      next:(data)=>{
        this.genreList = data.status
      }
    })
  }

  addCard() {
    if (this.editar && this.formCard.valid){
      this.cardService.updateCard(this.formCard.getRawValue()).subscribe(
        {
          next:(data)=>{
            console.log('Card updated successfully', data);
            this.router.navigate(['/card/list'])
          },
          error:(err)=>{
            console.error('Error updating card', err);
          },
          complete:()=> {
            console.log('Update card request completed');
          }
        }
      )
    } else
    if (!this.editar && this.formCard.valid)
    {
      this.cardService.addCard(this.formCard.getRawValue()).subscribe(
        {
          next:(data)=>{
            console.log('Card added successfully', data);
            this.router.navigate(['/card/list'])
          },
          error:(err)=>{
            console.error('Error updating card', err);
          },
          complete:()=> {
            console.log('Update card request completed');
          }
        }
      )
    }
  }

  addNewGenre() {
    let newGenre;
    if (!newGenre){
      newGenre = [];
    }
    if(!this.editar){
      this.genreList.push(this.myNewGenres.value)
    } else{
      newGenre = this.genres.value;
      newGenre.push(this.newGenre.value)
      this.genreList.push(this.newGenre.value);
      this.formCard.setControl('genres', new FormControl(newGenre));
    }
    this.myNewGenres.reset()
  }
}
