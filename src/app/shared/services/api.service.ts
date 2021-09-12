import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Message } from '@app/shared/classes/message';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  static readonly BASE = environment.api;

  constructor(private http: HttpClient) {
  }

  postMessage(data: Message): Observable<'created'> {
    return this.http.post<'created'>(`${ApiService.BASE}message/`, data);
  }
}
