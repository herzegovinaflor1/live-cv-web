import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Language, ModificationRequest } from 'src/app/types/types';
import { environment } from 'src/environments/environment';
import { AuthorizationService } from '../authorization/authorization.service';
import { UserService } from '../user-service/user.service';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(
    private httpClient: HttpClient,
    private userService: UserService,
    private authorizationService: AuthorizationService,
  ) { }

  updateLanguages(languageUpdateRequest: ModificationRequest<Language>): Observable<any> {
    const options = {
      headers: new HttpHeaders()
        .append('Authorization', `Bearer ${this.authorizationService.getAccessToken()}`),
    };

    console.log('asdqwe');
    return this.httpClient.post(
      `${environment.host}/language/update`,
      {
        accountId: this.userService.getCurrentUserId(),
        ...languageUpdateRequest
      },
      options
    );
  }
}
