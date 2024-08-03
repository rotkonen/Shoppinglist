import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private expressUrl = 'http://localhost:3000';
  private token: string | null = null; // To store the JWT

  constructor(private http: HttpClient) { }

  // Signup method
  signup(username: string, password: string): Observable<any> {
    const url = `${this.expressUrl}/signup`;
    return this.http.post(url, { username, password });
  }

  // Login method
  login(username: string, password: string): Observable<any> {
    const url = `${this.expressUrl}/login`;
    return this.http.post(url, { username, password });
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token'); // Check if token exists
    return !!token; // Return true if token exists
  }

  // Save token after login
  saveToken(token: string): void {
    this.token = token;
    localStorage.setItem('jwt', token); // Save token to localStorage
  }

  logout(): void {
    localStorage.removeItem('token'); // Remove token from local storage
  }

  // Get token from localStorage
  getToken(): string | null {
    return localStorage.getItem('jwt');
  }

  // Make a request to a protected route
  getProtectedData(): Observable<any> {
    const url = `${this.expressUrl}/protected-route`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`
    });
    return this.http.get(url, { headers });
  }

}
