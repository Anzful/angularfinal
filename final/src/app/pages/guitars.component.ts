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

  onAddGuitar() {
    if (this.addGuitarForm.valid) {
      this.guitarService.createGuitar(this.addGuitarForm.value).subscribe({
        next: (res) => {
          this.successMsg = 'Guitar added successfully!';
          // You might refresh the guitars list or reset the form
          this.addGuitarForm.reset();
          // Reload guitars
          this.guitarService.getAllGuitars().subscribe(g => this.guitars = g);
        },
        error: (err) => {
          this.errorMsg = 'Error adding guitar.';
          console.error(err);
        }
      });
    }
  }
}
