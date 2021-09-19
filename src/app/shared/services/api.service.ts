import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Message } from '@app/shared/classes/message';
import { File as AppFile } from '@app/shared/interfaces/file';
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

  postFileUpload(file: File): Observable<AppFile> {
    const payload = new FormData();
    payload.append('file', file, file.name);
    return this.http.post<AppFile>(`${ApiService.BASE}file/upload/`, payload);
  }

  postFileDownload(file: AppFile): Observable<string> {
    return this.http.post(`${ApiService.BASE}file/download/`, file, {
      responseType: 'text',
    });
  }
}
