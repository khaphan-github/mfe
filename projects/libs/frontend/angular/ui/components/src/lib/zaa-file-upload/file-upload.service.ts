import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '@config/api.config';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  FILE_UPLOAD_ENDPOINT = API_ENDPOINTS.fileUpload;
  constructor(private http: HttpClient) { }

  getOneFile(id: string): Observable<any> {
    return this.http.get<any>(`${this.FILE_UPLOAD_ENDPOINT}/uploaded?id=${id}`);
  }

  deleteFile(id: string): Observable<any> {
    return this.http.delete<any>(`${this.FILE_UPLOAD_ENDPOINT}/uploaded/${id}`);
  }

  getUploadList(idList: any): Observable<any> {
    return this.http.post<any>(`${this.FILE_UPLOAD_ENDPOINT}/uploads`, { idList });
  }
}
