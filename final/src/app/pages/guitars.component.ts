import { Component, OnInit } from '@angular/core';
import { GuitarService } from '../services/guitar.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-guitars',
  templateUrl: './guitars.component.html',
  styleUrls: ['./guitars.component.css']
})
export class GuitarsComponent implements OnInit {
  guitars: any[] = [];
  filteredGuitars: any[] = []; // For displaying filtered guitars
  searchTerm: string = ''; // Search term bound to input

  // For adding a new guitar
  addGuitarForm!: FormGroup;
  successMsg = '';
  errorMsg = '';
  isLoading: boolean = false; // Indicates loading state for guitars
  isAdding: boolean = false; // Indicates loading state for adding guitar

  constructor(
    private guitarService: GuitarService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    // Initialize the add guitar form
    this.initializeAddGuitarForm();

    // Load guitars
    this.fetchGuitars();
  }

  /**
   * Initializes the add guitar form with validators.
   */
  private initializeAddGuitarForm(): void {
    this.addGuitarForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      brand: new FormControl('', [Validators.required, Validators.minLength(2)]),
      price: new FormControl('', [Validators.required, Validators.min(0)])
    });
  }

  /**
   * Fetches all guitars from the service and initializes the filtered list.
   */
  private fetchGuitars(): void {
    this.isLoading = true;
    this.guitarService.getAllGuitars().subscribe({
      next: (data) => {
        this.guitars = data;
        this.filteredGuitars = data; // Initialize filtered list
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.errorMsg = 'Failed to load guitars. Please try again later.';
        this.isLoading = false;
      }
    });
  }

  /**
   * Handles the search functionality by filtering guitars based on the search term.
   */
  onSearch(): void {
    if (!this.searchTerm.trim()) {
      // If search term is empty, reset to all guitars
      this.filteredGuitars = this.guitars;
    } else {
      const lowerTerm = this.searchTerm.toLowerCase();
      this.filteredGuitars = this.guitars.filter(guitar =>
        guitar.name.toLowerCase().includes(lowerTerm) ||
        guitar.brand.toLowerCase().includes(lowerTerm)
      );
    }
  }

  /**
   * Handles adding a new guitar by submitting the form data to the service.
   */
  onAddGuitar(): void {
    if (this.addGuitarForm.valid) {
      this.isAdding = true;
      this.guitarService.createGuitar(this.addGuitarForm.value).subscribe({
        next: (res) => {
          this.successMsg = 'Guitar added successfully!';
          this.errorMsg = '';
          this.isAdding = false;

          // Reset the form
          this.addGuitarForm.reset();

          // Reload the guitars list
          this.fetchGuitars();
        },
        error: (err) => {
          console.error(err);
          this.errorMsg = 'Error adding guitar. Please try again.';
          this.successMsg = '';
          this.isAdding = false;
        }
      });
    }
  }
}
