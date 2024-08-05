import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private expressUrl = 'http://localhost:3000';
  private tokenKey = 'auth_token';

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

  // Save token after login
  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  // Get token from localStorage
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
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
