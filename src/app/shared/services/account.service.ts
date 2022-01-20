import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountData } from '@app/shared/interfaces/account-data';
import { ApiService } from '@app/shared/services/api.service';
import { map } from 'rxjs/operators';
import { User } from '@app/shared/classes/user';
import { Room } from '@app/shared/classes/room';

@Injectable({
  providedIn: 'root',
})
export class AccountService {

  private static syncStorage(data: AccountData): void {
    AccountService.email = data.email;
    AccountService.token = data.token;
    localStorage.user = data.user;
    User.load();
    Room.list.forEach((room: Room): void => {
      room.remove();
    });
    localStorage.rooms = data.rooms;
    Room.load();
  }

  static get email(): string | null {
    return localStorage.email || null;
  }

  static set email(value: string | null) {
    if (value) {
      localStorage.email = value;
    } else {
      delete localStorage.email;
    }
  }

  static get token(): string | null {
    return localStorage.token || null;
  }

  static set token(value: string | null) {
    if (value) {
      localStorage.token = value;
    } else {
      delete localStorage.token;
    }
  }

  static clear(): void {
    AccountService.email = null;
    AccountService.token = null;
  }

  constructor(private http: HttpClient) {
  }

  register(payload: { email: string; password: string }): Observable<AccountData> {
    return this.http.post<AccountData>(`${ApiService.BASE}account/register/`, Object.assign({
      rooms: localStorage.getItem('rooms') || JSON.stringify([]),
      user: localStorage.getItem('user') || JSON.stringify({}),
    }, payload)).pipe(map((data: AccountData): AccountData => {
      AccountService.email = data.email;
      AccountService.token = data.token;
      return data;
    }));
  }

  login(data: { email: string; password: string }): Observable<AccountData> {
    return this.http.post<AccountData>(`${ApiService.BASE}account/login/`, data).pipe(
      map((data: AccountData): AccountData => {
        AccountService.email = data.email;
        AccountService.token = data.token;
        AccountService.syncStorage(data);
        return data;
      }),
    );
  }

  fetch(): Observable<void> {
    return this.http.get<AccountData>(`${ApiService.BASE}account/me/`, {
      params: {
        email: AccountService.email,
        token: AccountService.token,
      },
    }).pipe(map((data: AccountData): void => {
      AccountService.syncStorage(data);
    }));
  }

  update(): Observable<void> {
    return this.http.post<void>(`${ApiService.BASE}account/me/`, {
      email: AccountService.email,
      token: AccountService.token,
      rooms: localStorage.getItem('rooms'),
      user: localStorage.getItem('user'),
    });
  }
}
