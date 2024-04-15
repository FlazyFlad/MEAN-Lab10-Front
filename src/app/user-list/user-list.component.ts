import { Component, OnInit } from '@angular/core';
import { UserService } from '../UserService';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: any[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    // // Извлечение данных пользователей из localStorage и преобразование из JSON
    // const savedUsers = localStorage.getItem('signUpUsers');
    // if (savedUsers) {
    //   this.users = JSON.parse(savedUsers);
    // }
    this.loadUsers();
  }

  loadUsers() {
    // Загрузка пользователей из сервиса
    this.userService.getUsers().subscribe(
      users => {
        this.users = users;
      },
      error => {
        console.error('Ошибка при загрузке пользователей:', error);
      }
    );
  }

  deleteUser(userId: string) {
    // Удаление пользователя через сервис UserService
    this.userService.deleteUser(userId).subscribe(
      () => {
        // Успешное удаление пользователя, обновляем список пользователей
        this.loadUsers();
      },
      error => {
        console.error('Ошибка при удалении пользователя.');
      }
    );
  }

  // onSaveUserChanges(updatedUser: any) {
  //   // Найдите индекс пользователя в массиве users и обновите его данные
  //   const userIndex = this.users.findIndex(user => user.id === updatedUser.id);
  //   if (userIndex !== -1) {
  //     this.users[userIndex] = updatedUser;

  //     // Сохраните обновленные данные пользователей в localStorage
  //     localStorage.setItem('signUpUsers', JSON.stringify(this.users));
  //   }
  // }
}
