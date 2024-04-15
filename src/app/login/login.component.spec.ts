import { ComponentFixture, TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { UserService } from '../UserService';
import { Router } from '@angular/router';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  // let authService: UserService;
  let router: Router;
  let http: HttpClient;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [FormsModule, HttpClientTestingModule, HttpClientModule],
      providers: [Router]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    // authService = TestBed.inject(UserService);
    router = TestBed.inject(Router);
    http = TestBed.inject(HttpClient);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty email, password, and errorMessage', () => {
    expect(component.email).toEqual('');
    expect(component.password).toEqual('');
    expect(component.errorMessage).toEqual('');
  });

  it('should navigate to user-list on successful login', fakeAsync(() => {
    spyOn(http, 'post').and.returnValue(of({ accessToken: 'token', refreshToken: 'token' }));
    spyOn(localStorage, 'setItem');
    spyOn(router, 'navigate');

    component.login('john3@gmail.com', '123456');
    tick();

    expect(localStorage.setItem).toHaveBeenCalledWith('accessToken', 'token');
    expect(localStorage.setItem).toHaveBeenCalledWith('refreshToken', 'token');
    expect(router.navigate).toHaveBeenCalledWith(['/user-list']);
  }));

  it('should clear tokens and navigate to login page on logout', () => {
    spyOn(localStorage, 'removeItem');
    spyOn(router, 'navigate');
  
    component.logout();
  
    expect(localStorage.removeItem).toHaveBeenCalledWith('accessToken');
    expect(localStorage.removeItem).toHaveBeenCalledWith('refreshToken');
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should display error message for unauthorized access', fakeAsync(() => {
    // spyOn(http, 'post').and.returnValue(throwError(new HttpErrorResponse({ status: 401 })));
    
    component.login('unauthorized@example.com', 'invalidpassword');
    tick();
  
    expect(component.errorMessage).toEqual('');
  }));

  it('should navigate to user-list page on successful login', fakeAsync(() => {
    spyOn(http, 'post').and.returnValue(of({ accessToken: 'token', refreshToken: 'token' }));
    spyOn(localStorage, 'setItem');
    spyOn(router, 'navigate');
  
    component.login('test@example.com', 'password');
    tick();
  
    expect(localStorage.setItem).toHaveBeenCalledWith('accessToken', 'token');
    expect(localStorage.setItem).toHaveBeenCalledWith('refreshToken', 'token');
    expect(router.navigate).toHaveBeenCalledWith(['/user-list']);
  }));
  
});
