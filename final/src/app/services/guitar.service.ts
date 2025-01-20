import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuitarService {
  private API_URL = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getAllGuitars(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/guitars`);
  }
  createGuitar(guitarData: { name: string; brand: string; price: number; image: string }): Observable<any> {
    // This requires an admin token on the server side
    return this.http.post(`${this.API_URL}/guitars`, guitarData);
  }
  
}
