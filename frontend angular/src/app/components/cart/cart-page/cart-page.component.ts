import { Component, inject } from '@angular/core';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { CartStateService } from '../../../service/cart-state.service';
import { RouterLink } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-cart-page',
  imports: [AsyncPipe, CurrencyPipe, RouterLink],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export class CartPageComponent {
  private readonly cartState = inject(CartStateService);

  readonly items$ = this.cartState.items$;
  readonly total$ = this.cartState.items$.pipe(
    map((items) => items.reduce((sum, item) => sum + item.card.price * item.quantity, 0))
  );

  updateQuantity(cardId: string, value: string): void {
    const quantity = Number.parseInt(value, 10);
    if (!Number.isFinite(quantity)) {
      return;
    }
    this.cartState.updateQuantity(cardId, quantity);
  }

  remove(cardId: string): void {
    this.cartState.removeCard(cardId);
  }

  clear(): void {
    this.cartState.clear();
  }
}
