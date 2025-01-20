// guitar-card.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

export interface Guitar {
  id: number;
  name: string;
  brand: string;
  price: number;
  image: string;
  description?: string;
}

@Component({
  selector: 'app-guitar-card',
  templateUrl: './guitar-card.component.html',
  styleUrls: ['./guitar-card.component.css'],
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class GuitarCardComponent {
  @Input() guitar!: Guitar;
  @Output() addToCart: EventEmitter<Guitar> = new EventEmitter<Guitar>();
  @Output() viewDetails: EventEmitter<Guitar> = new EventEmitter<Guitar>();

  onAddToCart() {
    this.addToCart.emit(this.guitar);
  }

  onViewDetails() {
    this.viewDetails.emit(this.guitar);
  }

  getImage(): string {
    return this.guitar.image ? `assets/images/${this.guitar.image}` : 'assets/images/default-guitar.jpg';
  }
}
