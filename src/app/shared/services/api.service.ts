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

  postMessage(data: Message): Observable<Message> {
    return this.http.post<Message>(`${ApiService.BASE}message/`, Object.assign(data, { presence: true }));
  }

  postFile(file: File): Observable<{ file: string }> {
    const payload = new FormData();
    payload.append('file', file, file.name);
    return this.http.post<{ file: string }>(`${ApiService.BASE}file/`, payload);
  }
}
