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

  constructor(
    private guitarService: GuitarService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.addGuitarForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      brand: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      image: new FormControl('', [Validators.required]) // Add image field
    });
  }

  onAddGuitar() {
    if (this.addGuitarForm.valid) {
      this.guitarService.createGuitar(this.addGuitarForm.value).subscribe({
        next: (res) => {
          this.successMsg = 'Guitar added successfully!';
          this.errorMsg = '';
          this.addGuitarForm.reset();
        },
        error: (err) => {
          this.errorMsg = 'Error adding guitar.';
          console.error(err);
        }
      });
    }
  }
}
