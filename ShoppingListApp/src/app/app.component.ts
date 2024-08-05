import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet,Router,NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  showLogoutButton: boolean = false;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.checkRoute();
    });
    this.checkRoute();
  }

  checkRoute() {
    const currentRoute = this.router.url;
    this.showLogoutButton = currentRoute === '/shopping-list';
  }

  onLogout(): void {
    this.userService.logout();
    this.router.navigate(['']);
  }
}
