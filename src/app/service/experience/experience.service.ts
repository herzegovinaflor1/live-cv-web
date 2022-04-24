import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Experience, ModificationRequest } from 'src/app/types/types';
import { environment } from 'src/environments/environment';
import { AuthorizationService } from '../authorization/authorization.service';
import { UserService } from '../user-service/user.service';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {

  constructor(
    private httpClient: HttpClient,
    private userService: UserService,
    private authorizationService: AuthorizationService,
  ) { }

  updateExperience(experienceUpdateRequest: ModificationRequest<Experience>): Observable<Experience[]> {
    const options = {
      headers: new HttpHeaders()
        .append('Authorization', `Bearer ${this.authorizationService.getAccessToken()}`),
    };
    return this.httpClient.post<Experience[]>(
      `${environment.host}/experience/update`,
      {
        accountId: this.userService.getCurrentUserId(),
        ...experienceUpdateRequest
      },
      options
    )
  }
}
