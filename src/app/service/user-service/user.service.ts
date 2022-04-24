import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { ShareLink, ShareLinkCommand, SummaryDataChangeRequest, User, UserField } from 'src/app/types/types';
import { environment } from 'src/environments/environment';
import { AuthorizationService } from '../authorization/authorization.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userId: string | null = null;

  constructor(
    private httpClient: HttpClient,
    private authorizationService: AuthorizationService
  ) { }

  getCurrentUserId(): any {
    return this.userId;
  }

  getUser(userId: string): Observable<User> {
    return this.httpClient
      .get<User>(`${environment.host}/user/${userId}`)
      .pipe(
        tap((data: User) => {
          this.assignUserId(data.id);
        })
      )
  }

  getUserByToken(token: string): Observable<User> {
    return this.httpClient
      .get<User>(`${environment.host}/user/share-link/${token}`)
      .pipe(
        tap((data: User) => {
          this.assignUserId(data.id);
        })
      )
  }

  generateShareLink(command: ShareLinkCommand): Observable<ShareLink> {
    const options = {
      headers: new HttpHeaders()
        .append('Authorization', `Bearer ${this.authorizationService.getAccessToken()}`)
        .append('Content-Type', 'application/json')
    };

    return this.httpClient.post<ShareLink>(
      `${environment.host}/user/share-link`,
      {
        accountId: this.getCurrentUserId(),
        command: command
      },
      options
    );
  }

  updateUserDataByField(changeRequest: SummaryDataChangeRequest): Observable<any> {
    if (this.isDataHasBeenChanged(changeRequest)) {
      const options = {
        headers: new HttpHeaders()
          .append('Authorization', `Bearer ${this.authorizationService.getAccessToken()}`),
      };

      return this.httpClient.post(
        `${environment.host}/user/summary`,
        [{
          accountId: this.getCurrentUserId(),
          action: "EDIT",
          userUpdateField: changeRequest.userFiled,
          value: changeRequest.newValue
        }],
        options
      );
    }
    return of({})
  }

  private isDataHasBeenChanged(changeRequest: SummaryDataChangeRequest) {
    return changeRequest.newValue !== changeRequest.oldValue;
  }

  private assignUserId(userId: string) {
    this.userId = userId;
  }

}
