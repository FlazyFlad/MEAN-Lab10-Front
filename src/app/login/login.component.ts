import { Component } from '@angular/core';
import { UserService } from '../UserService';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../enviroment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  private apiUrl = environment.apiUrl;

  constructor(private authService: UserService, private router: Router, private http: HttpClient) { }

  login(email: string, password: string) {
    this.http.post<any>(`${this.apiUrl}/users/login`, { email, password })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.errorMessage = error.error.message;
          this.router.navigate(['/login']);
          // console.error('11', error);
          // if (error.status === 401) {
          //   console.error('Unauthorized access');
          //   this.errorMessage = 'Invalid username or password';
          //   this.router.navigate(['/login']);
          // }
          return throwError('Error occurred while logging in. Please try again.');
        })
      )
      .subscribe(response => {
        localStorage.setItem('accessToken', response.accessToken);
        localStorage.setItem('refreshToken', response.refreshToken);
        // this.errorMessage = '';
        this.router.navigate(['/user-list']);
      });
  }


  logout(): void {
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('accessToken');
    this.router.navigate(['/login']);
  }

} 