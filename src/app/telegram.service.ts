import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class TelegramService {

  private apiUrl = `https://api.telegram.org/bot7056871750:AAGKdB1aLj_fHZ4zjU4vVtOeDIhGqxiAHcc`;

  constructor() { }

  sendMessage(chatId: string, text: string): Promise<any> {
    const sendMessageUrl = `${this.apiUrl}/sendMessage`;
    const params = new URLSearchParams({
      chat_id: chatId,
      text: text
    });

    return axios.post(sendMessageUrl, params)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.error('Error sending message:', error);
        throw error;
      });
  }
}
