import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private expressUrl = 'http://localhost:3000';
  private tokenKey = 'auth_token';
  public itemAdded$ = new Subject<void>();

  constructor(private http: HttpClient) { }

  // Create headers with JWT token
  private createHeaders(): HttpHeaders {
    const token = localStorage.getItem(this.tokenKey);
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json' 
    });
  }

  // Get all items
  getItems(): Observable<any> {
    const headers = this.createHeaders();
    return this.http.get(`${this.expressUrl}/items`, { headers });
  }

  // Add a new item
  addItem(item: string, quantity: number): Observable<any> {
    const headers = this.createHeaders();
    return this.http.post(`${this.expressUrl}/items`, { item, quantity }, { headers }).pipe(
      tap(() => this.itemAdded$.next())
    );
  }

  // Edit an item
  editItem(id: string, item: string, quantity: number): Observable<any> {
    const headers = this.createHeaders();
    return this.http.put(`${this.expressUrl}/items/${id}`, { item, quantity }, { headers });
  }

  // Delete an item
  deleteItem(id: string): Observable<any> {
    const headers = this.createHeaders();
    return this.http.delete(`${this.expressUrl}/items/${id}`, { headers });
  }

  // Update collected status of an item
  updateCollectedStatus(id: string, collected: boolean): Observable<any> {
  const headers = this.createHeaders();
  return this.http.put(`${this.expressUrl}/items/${id}/collected`, { collected }, { headers });
}
}
