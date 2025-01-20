import { Component, OnInit } from '@angular/core';
import { GuitarService } from '../services/guitar.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  featuredGuitars: any[] = []; // Define the property to hold featured guitars

  constructor(private guitarService: GuitarService) {}

  ngOnInit(): void {
    // Fetch guitars and pick the first 3 as featured (or any other logic)
    this.guitarService.getAllGuitars().subscribe({
      next: (guitars) => {
        // Example logic: take the first 3 guitars as featured
        this.featuredGuitars = guitars.slice(0, 3);
      },
      error: (err) => {
        console.error('Error fetching guitars:', err);
      }
    });
  }
}
