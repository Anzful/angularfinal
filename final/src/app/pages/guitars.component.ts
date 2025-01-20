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

  constructor(
    private guitarService: GuitarService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    // Load guitars
    this.guitarService.getAllGuitars().subscribe({
      next: (data) => {
        this.guitars = data;
        this.filteredGuitars = data; // Initialize filtered list
      },
      error: (err) => {
        console.error(err);
      }
    });

    // Setup form
    this.addGuitarForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      brand: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required])
    });
  }

  onSearch() {
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

  onAddGuitar() {
    if (this.addGuitarForm.valid) {
      this.guitarService.createGuitar(this.addGuitarForm.value).subscribe({
        next: (res) => {
          this.successMsg = 'Guitar added successfully!';
          this.errorMsg = '';

          // Reset the form
          this.addGuitarForm.reset();

          // Reload the guitars list
          this.guitarService.getAllGuitars().subscribe({
            next: (g) => {
              this.guitars = g;
              this.filteredGuitars = g; // Update filtered list as well
            },
            error: (e) => {
              console.error(e);
            }
          });
        },
        error: (err) => {
          this.errorMsg = 'Error adding guitar.';
          this.successMsg = '';
          console.error(err);
        }
      });
    }
  }
}
