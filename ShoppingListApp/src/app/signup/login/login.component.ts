import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { UserService } from '../../user.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule, RouterModule, FontAwesomeModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  faUser = faUser;
  faLock = faLock;
  
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  error: string | null = null;
  showSignup: boolean = false;

  constructor(private userService: UserService, private router: Router) { }


  login(): void {
    if (this.username && this.password) {
      this.userService.login(this.username, this.password).subscribe(
        (response: any) => {
          console.log('Login successful', response);
          this.userService.saveToken(response.token); // Save JWT token
          this.error = null; // Clear any previous errors
          this.router.navigate(['/shopping-list']);
        },
        (error) => {
          console.error('Login failed', error);
          this.error = 'Login failed. Please check your credentials.';
        }
      );
    } else {
      this.error = 'Username and password are required.';
    }
  }

  signup(): void {
    if (this.username && this.password && this.password === this.confirmPassword) {
      this.userService.signup(this.username, this.password).subscribe(
        (response: any) => {
          console.log('Signup successful', response);
          this.userService.saveToken(response.token); // Save JWT token
          this.error = null; // Clear any previous errors
        },
        (error) => {
          console.error('Signup failed', error);
          this.error = 'Signup failed. Please try again.';
        }
      );
    } else {
      this.error = 'Please ensure all fields are filled correctly and passwords match.';
    }
  }

  toggleForm() {
    this.showSignup = !this.showSignup;
    this.error = '';
  }

}
