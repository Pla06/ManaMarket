import {Component, inject, Input, OnInit} from '@angular/core';
import {ServiceCardService} from '../../../service/service-card.service';
import {Card} from '../../../common/interface-card';
import {RouterLink} from '@angular/router';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {faTrashCan} from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-card-list',
  imports: [
    RouterLink,
    FaIconComponent
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

  protected readonly faTrashCan = faTrashCan;

  deleteCard(card: Card) {
    if (confirm('Desea eliminar la carta?' + card.title + '?')) {
      this.cardService.deleteCard(card._id).subscribe({
        next: (data) => {
          console.log('Carta eliminada:', data);
          this.loadCards();
        },
        error: (err) => {
          console.error('Error eliminando la carta:', err);
        }
      });
    }
  }
}
