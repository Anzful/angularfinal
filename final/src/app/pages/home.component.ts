import { Component, OnInit } from '@angular/core';
import { GuitarService } from '../services/guitar.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  featuredGuitars: any[] = []; // Holds featured guitars
  isLoading: boolean = false; // Indicates loading state
  errorMsg: string = ''; // Stores error messages

  constructor(private guitarService: GuitarService) {}

  ngOnInit(): void {
    this.fetchFeaturedGuitars();
  }

  fetchFeaturedGuitars(): void {
    this.isLoading = true;
    this.guitarService.getAllGuitars().subscribe({
      next: (guitars) => {
        this.isLoading = false;
        // Example logic: select 3 random guitars as featured
        this.featuredGuitars = this.getRandomGuitars(guitars, 3);
      },
      error: (err) => {
        console.error('Error fetching guitars:', err);
        this.isLoading = false;
        this.errorMsg = 'Failed to load featured guitars. Please try again later.';
      }
    });
  }

  // Helper method to select random guitars
  getRandomGuitars(guitars: any[], count: number): any[] {
    const shuffled = guitars.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }
}
