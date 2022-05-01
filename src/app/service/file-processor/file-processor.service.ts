import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserService } from '../user-service/user.service';

@Injectable({
  providedIn: 'root'
})
export class FileProcessorService {

  constructor(
    private httpClient: HttpClient,
    private userService: UserService,
  ) { }

  getCurrentUserPhoto(): Observable<any> {
    return this.httpClient.post(`${environment.host}/photo/user`, {
      accountId: this.userService.getCurrentUserId()
    }, { responseType: 'blob' })
  }

  updateCurrentUserPhoto(accountId: string): Observable<any> {
    return this.httpClient.put(`${environment.host}/photo/user`, {}, { responseType: 'blob' })
  }

  downloadCVFile(): Observable<any> {
    return this.httpClient.post(`${environment.host}/cv/download`,
      {
        accountId: this.userService.getCurrentUserId()
      },
      {

        responseType: 'blob'
      }
    );
  }
}
