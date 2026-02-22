import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {InterfaceCard, InterfaceCards, Card} from '../common/interface-card';

@Injectable({
  providedIn: 'root'
})
export class ServiceCardService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly URL_Base: string = 'http://localhost:3000/api/v1/cards/';

  constructor() { }
  //todas las peliculas
  getCards():Observable<InterfaceCards>{
    return this.http.get<InterfaceCards>(this.URL_Base)
  }

  getCard(id: string):Observable<InterfaceCard>{
    return this.http.get<InterfaceCard>(this.URL_Base + id)
  }

  //nuevas funciones para el CRUD

  addCard(card: Card): Observable<ApiResponse>{
    return this.http.post<ApiResponse>(this.URL_Base, card)
  }

  updateCard(card: Card):Observable<ApiResponse>{
    return this.http.put<ApiResponse>(this.URL_Base+ card._id, card);
  }

  deleteCard(id:string):Observable<ApiResponse>{
    return this.http.delete<ApiResponse>(this.URL_Base + id);
  }

  getGenres():Observable<ApiResponseGenres>{
    return this.http.get<ApiResponseGenres>(this.URL_Base + 'collections')
  }

  getCollections():Observable<ApiResponseGenres>{
    return this.getGenres();
  }
}

export interface ApiResponse{
  status: string;
}

export interface ApiResponseGenres{
  status: string[];
}
