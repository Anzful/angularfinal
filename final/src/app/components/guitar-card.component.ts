// guitar-card.component.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-guitar-card',
  templateUrl: './guitar-card.component.html',
  styleUrls: ['./guitar-card.component.css']
  // Remove standalone: true
})
export class GuitarCardComponent {
  @Input() guitar: any;  // <--- your property
}
