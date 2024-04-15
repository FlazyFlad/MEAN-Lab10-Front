// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class UserService {
//   private apiUrl = 'http://127.0.0.1:3000/users/';

//   constructor(private http: HttpClient) {}

//   registerUser(user: any): Observable<any> {
//     const httpOptions = {
//       headers: new HttpHeaders({
//         'Content-Type': 'application/json'
//       })
//     };

//     return this.http.post<any>(this.apiUrl, JSON.stringify(user), httpOptions);
//   }

//   getUsers(): Observable<any[]> {
//     return this.http.get<any[]>(this.apiUrl);
//   }

//   getUserById(userId: number): Observable<any> {
//     const url = `${this.apiUrl}/${userId}`;
//     return this.http.get<any>(url);
//   }

//   updateUser(userId: string, user: any): Observable<any> {
//     const url = `${this.apiUrl}/${userId}`; // Обратите внимание на / перед userId
//     const httpOptions = {
//       headers: new HttpHeaders({
//         'Content-Type': 'application/json'
//       })
//     };

//     return this.http.patch<any>(url, JSON.stringify(user), httpOptions);
//   }


//   deleteUser(userId: string): Observable<any> {
//     const url = `${this.apiUrl}/${userId}`;
//     return this.http.delete<any>(url);
//   }

// }

// #2
// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class UserService {
//   private apiUrl = 'http://127.0.0.1:3000/users/';

//   constructor(private http: HttpClient) { }

//   registerUser(user: any): Observable<any> {
//     return this.http.post<any>(this.apiUrl, user);
//   }

//   getUsers(): Observable<any[]> {
//     return this.http.get<any[]>(this.apiUrl);
//   }

//   getUserById(userId: number): Observable<any> {
//     const url = `${this.apiUrl}/${userId}`;
//     return this.http.get<any>(url);
//   }

//   updateUser(userId: string, user: any): Observable<any> {
//     const url = `${this.apiUrl}/${userId}`;
//     return this.http.patch<any>(url, user);
//   }

//   deleteUser(userId: string): Observable<any> {
//     const url = `${this.apiUrl}/${userId}`;
//     return this.http.delete<any>(url);
//   }
// }

// # 3

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/enviroment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  registerUser(user: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, user);
  }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Error getting users:', error);
        return throwError('Something went wrong while fetching users. Please try again later.');
      })
    );
  }

  getUserById(userId: number): Observable<any> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.get<any>(url).pipe(
      catchError(error => {
        console.error(`Error getting user with ID ${userId}:`, error);
        return throwError('User not found or something went wrong while fetching user details.');
      })
    );
  }

  updateUser(userId: string, user: any): Observable<any> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.patch<any>(url, user);
  }

  deleteUser(userId: string): Observable<any> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.delete<any>(url);
  }

  login(email: string, password: string) {

    return this.http.post<any>(`${this.apiUrl}login`, { email, password })
      .subscribe(response => {
        localStorage.setItem('accessToken', response.accessToken);
        localStorage.setItem('refreshToken', response.refreshToken);
      });
  }

  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('accessToken');
  }

}
