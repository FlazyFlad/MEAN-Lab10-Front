import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { UserService } from '../UserService';

// Добавьте объявление типа User, если оно не было добавлено ранее
// interface User {
//   id: number;
//   // Другие свойства пользователя
// }

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  isEditing = false;

  user: any;
  userId: number = 0;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
    ) {}

  ngOnInit() {
    // // Получение индекса пользователя из URL
    // this.route.params.subscribe(params => {
    //   const userIndex = +params['userId']; // Преобразуйте в число

    //   this.userId = userIndex;

    //   // Извлеките объект пользователя с использованием индекса из localStorage
    //   const savedUsers = localStorage.getItem('signUpUsers');
    //   if (savedUsers) {
    //     const users: User[] = JSON.parse(savedUsers);

    //     // Проверка, что индекс находится в допустимых пределах массива
    //     if (userIndex >= 0 && userIndex < users.length) {
    //       this.user = users[userIndex];
    //     } else {
    //       console.error('Пользователь не найден.'); // Обработка случая, если пользователь не найден
    //     }
    //   }
    // });
    this.route.params.subscribe(params => {
      this.userId = params['userId'];
      console.log(this.userId)
      this.userService.getUserById(this.userId).subscribe(
        user => {
          this.user = user;
        },
        error => {
          console.error('Пользователь не найден.');
        }
      );
    });
  }

  saveChanges() {
    // Обновите объект пользователя в массиве данных
    // const savedUsers = localStorage.getItem('signUpUsers');
    // if (savedUsers) {
    //   const users: User[] = JSON.parse(savedUsers);

    //   if (this.userId >= 0 && this.userId < users.length) {
    //     // Обновите данные пользователя
    //     users[this.userId] = this.user;

    //     // Сохраните обновленные данные в localStorage
    //     localStorage.setItem('signUpUsers', JSON.stringify(users));
    //   }
    // }
    // this.router.navigate(['/user-list']);
    // Преобразуйте userId в строку перед вызовом updateUser
    const userIdString: string = this.userId.toString();

    this.userService.updateUser(userIdString, this.user).subscribe(
      updatedUser => {
        this.user = updatedUser;
        this.router.navigate(['/user-list']);
      },
      error => {
        console.error('Ошибка при обновлении пользователя.');
      }
    );
    }
}



interface User {
  id: string;
}