import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ServiceCardService } from '../../../service/service-card.service';
import { Card } from '../../../common/interface-card';
import { CartStateService } from '../../../service/cart-state.service';

@Component({
  selector: 'app-card-detail',
  imports: [RouterLink],
  templateUrl: './card-detail.component.html',
  styleUrl: './card-detail.component.css'
})
export class CardDetailComponent implements OnInit {
  private readonly cardService = inject(ServiceCardService);
  private readonly cartState = inject(CartStateService);
  private readonly route = inject(ActivatedRoute);

  card: Card | null = null;
  loading = true;
  errorMessage = '';
  statusMessage = '';

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.loading = false;
      this.errorMessage = 'No se encontro la carta solicitada.';
      return;
    }

    this.cardService.getCard(id).subscribe({
      next: (data) => {
        this.card = data.status;
      },
      error: () => {
        this.errorMessage = 'No se pudo cargar la carta.';
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  addToCart(): void {
    if (!this.card) {
      return;
    }

    this.cartState.addCard(this.card, 1);
    this.statusMessage = 'Carta agregada al carrito.';
  }
}
