import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../UserService';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent {
  registrationForm: FormGroup;
  private nextUserId: number = 1;

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService, private http: HttpClient) {
    this.registrationForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      age: ['', [Validators.required, Validators.minLength(1)]]
      // dateOfBirth: ['', [Validators.required, this.validateDate]],
      // gender: ['', Validators.required],
    });
  }


  validateDate(control: any) {
    const selectedDate = new Date(control.value);
    const currentDate = new Date();
    if (selectedDate > currentDate) {
      return { invalidDate: true };
    }
    return null;
  }




  signupUsers: any[] = [];

  signupObj = {
    userName: '',
    email: '',
    password: '',
    age: ''
    // dateOfBirth: '',
    // gender: ''
  };

  loginObj = {
    userName: '',
    password: ''
  };

  ngOnInit(): void {
    const localData = localStorage.getItem('signUpUsers');
    if (localData != null) {
      this.signupUsers = JSON.parse(localData);
    }
  }

  
  onSignUp() {
    console.log(this.signupObj)
    this.userService.registerUser(this.signupObj).subscribe(
      response => {
        console.log('Пользователь успешно зарегистрирован:', response);
      },
      error => {
        console.error('Ошибка при регистрации:', error);
        if (error.status === 401 || error.status === 403) {
          // this.router.navigate(['/login']);
          console.log("Auth Interceptor call")
        } else {
          console.log("1")
        }
      }
    );
    this.signupUsers.push(this.signupObj);
    localStorage.setItem('signUpUsers', JSON.stringify(this.signupUsers))
    this.router.navigate(['/user-list']);
    this.signupObj = {
      userName: '',
      email: '',
      password: '',
      age: '',
      // dateOfBirth: '',
      // gender: ''
    };
  }
}
