import { Component, Input } from '@angular/core';
import { Producto } from '../../shared/mock-productos';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
   @Input() product!: any;

   getFullStars(rating: number): number[] {
  const fullStars = Math.floor(rating);
  return Array(fullStars).fill(0);
}

hasHalfStar(rating: number): boolean {
  return rating % 1 !== 0;
}

}
