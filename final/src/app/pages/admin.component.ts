import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GuitarService } from '../services/guitar.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  addGuitarForm!: FormGroup;
  successMsg: string = '';
  errorMsg: string = '';
  isAdding: boolean = false; // Indicates loading state for adding guitar

  constructor(
    private guitarService: GuitarService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.initializeAddGuitarForm();
  }

  /**
   * Initializes the add guitar form with validators.
   */
  private initializeAddGuitarForm(): void {
    this.addGuitarForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      brand: new FormControl('', [Validators.required, Validators.minLength(2)]),
      price: new FormControl('', [Validators.required, Validators.min(0)]),
      image: new FormControl('', [Validators.required, Validators.pattern(/(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg))/i)])
    });
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
