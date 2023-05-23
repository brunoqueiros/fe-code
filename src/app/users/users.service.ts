import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const BASE_USER_URL = 'https://demo-api.vercel.app';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(private http: HttpClient) {}

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${BASE_USER_URL}/users`, user, this.httpOptions);
  }
}
