import { Component } from '@angular/core';
import { RouterOutlet,Router } from '@angular/router';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private userService: UserService, private router: Router) { }

  onLogout(): void {
    this.userService.logout();
    this.router.navigate(['']);
  }
}
