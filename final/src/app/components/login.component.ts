import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMsg: string = '';
  isLoading: boolean = false; // Indicates loading state during login

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeLoginForm();
  }

  /**
   * Initializes the login form with validators.
   */
  private initializeLoginForm(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required, 
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6) // Ensures a minimum password length
      ])
    });
  }

  /**
   * Handles form submission for user login.
   */
  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true; // Start loading
      this.errorMsg = ''; // Reset error message

      this.authService.login(this.loginForm.value).subscribe({
        next: (res) => {
          this.isLoading = false; // Stop loading
          // Navigate based on user role
          if (this.authService.isAdmin()) {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/']);
          }
        },
        error: (err) => {
          console.error(err);
          this.isLoading = false; // Stop loading
          // Set appropriate error message based on error type
          if (err.status === 401) {
            this.errorMsg = 'Invalid credentials. Please try again.';
          } else {
            this.errorMsg = 'An unexpected error occurred. Please try later.';
          }
        }
      });
    } else {
      this.errorMsg = 'Please fill out all required fields correctly.';
    }
  }
}
