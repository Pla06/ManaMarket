import {Component, inject} from '@angular/core';
import {ServiceCardService} from '../../../service/service-card.service';
import {Card} from '../../../common/interface-card';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-card-list',
  imports: [
    RouterLink
  ],
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.css'
})
export class CardListComponent {
  private readonly cardService: ServiceCardService = inject(ServiceCardService);
  cards: Card[] = [];
  constructor() {
    this.loadCards();
  }

  private loadCards() {
    this.cardService.getCards().subscribe(
      {
        next: data =>{
          this.cards = data.status;
        },
        error: err =>{
          console.error('Error carga de cards:', err);
        },
        complete:() =>{
          console.log('Card List cargada correctamente');
        }
      }
    )
  }
}
