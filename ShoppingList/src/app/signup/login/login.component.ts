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
  error: string = '';
  showSignup: boolean = false;

  constructor(private userService: UserService, private router: Router) { }

  login() {
    const user = this.userService.getUser(this.username);
    if (user && user.password === this.password) {
      this.error = '';
      console.log('Login successful');
      this.router.navigate(['shopping-list']);
    } else {
      this.error = 'Invalid username or password';
    }
  }

  signup() {
    if (this.password === this.confirmPassword) {
      this.userService.addUser(this.username, this.password);
      console.log('User registered successfully');
      this.login();
    } else {
      this.error = 'Passwords do not match';
    }
  }

  toggleForm() {
    this.showSignup = !this.showSignup;
    this.error = '';
  }
}
