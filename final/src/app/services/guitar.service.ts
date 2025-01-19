import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuitarService {
  // services/auth.service.ts
  private API_URL = 'http://localhost:3000/api';


  constructor(private http: HttpClient) {}

  getAllGuitars(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/guitars`);
  }

  // Additional CRUD methods if needed:
  // createGuitar(data: any): Observable<any> { ... }
  // updateGuitar(id: string, data: any): Observable<any> { ... }
  // deleteGuitar(id: string): Observable<any> { ... }
}
