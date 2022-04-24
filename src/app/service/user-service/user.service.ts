import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { ShareLink, ShareLinkCommand, SummaryDataChangeRequest, UserField } from 'src/app/types/types';
import { environment } from 'src/environments/environment';
import { AuthorizationService } from '../authorization/authorization.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userId: any = null;

  constructor(
    private httpClient: HttpClient,
    private authorizationService: AuthorizationService
  ) { }

  getCurrentUserId(): any {
    return this.userId;
  }

  getUser(userId: any): Observable<any> {
    return this.httpClient
      .get(`${environment.host}/user/${userId}`)
      .pipe(
        tap((data: any) => {
          console.log(this.userId = data.id)
        }),
      )
  }

  getUserByToken(token: string): Observable<any> {
    return this.httpClient
      .get(`${environment.host}/user/share-link/${token}`)
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
    console.log('asdqwe');
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

}
