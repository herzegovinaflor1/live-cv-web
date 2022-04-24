import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Education, ModificationRequest } from 'src/app/types/types';
import { environment } from 'src/environments/environment';
import { AuthorizationService } from '../authorization/authorization.service';
import { UserService } from '../user-service/user.service';

@Injectable({
  providedIn: 'root'
})
export class EducationService {

  constructor(
    private httpClient: HttpClient,
    private userService: UserService,
    private authorizationService: AuthorizationService
  ) { }

  updateEducation(educationUpdateRequest: ModificationRequest<Education>): Observable<Education[]> {
    const options = {
      headers: new HttpHeaders()
        .append('Authorization', `Bearer ${this.authorizationService.getAccessToken()}`),
    };

    return this.httpClient.post<Education[]>(
      `${environment.host}/education/update`,
      {
        accountId: this.userService.getCurrentUserId(),
        ...educationUpdateRequest
      },
      options);
  }
}
