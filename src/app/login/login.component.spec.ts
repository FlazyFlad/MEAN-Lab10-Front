import { ComponentFixture, TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { TelegramService } from '../telegram.service';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;
  let http: HttpClient;
  let telegramService: TelegramService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [FormsModule, HttpClientTestingModule, HttpClientModule],
      providers: [Router, TelegramService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    http = TestBed.inject(HttpClient);
    telegramService = TestBed.inject(TelegramService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    
    telegramService.sendMessage('511790458', 'Angular Test "should create" passed successfully');
  });

  it('should initialize with empty email, password, and errorMessage', () => {
    expect(component.email).toEqual('');
    expect(component.password).toEqual('');
    expect(component.errorMessage).toEqual('');

    
    telegramService.sendMessage('511790458', 'Angular Test "should initialize with empty email, password, and errorMessage" passed successfully');
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

    telegramService.sendMessage('511790458', 'Angular Test "should clear tokens and navigate to login page on logout" passed successfully');
  });

  it('should display error message for unauthorized access', fakeAsync(() => {
    
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
