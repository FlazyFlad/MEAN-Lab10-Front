import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-angular-app';
  users: any[] = [];

  constructor(private router: Router, private http: HttpClient) { }

  isLoggedIn(): boolean {
    if (localStorage.getItem('refreshToken') && localStorage.getItem('accessToken')) {
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('accessToken');
    this.router.navigate(['/login']);
  }


}
