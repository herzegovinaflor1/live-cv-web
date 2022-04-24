import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ModificationRequest, Skill } from 'src/app/types/types';
import { environment } from 'src/environments/environment';
import { AuthorizationService } from '../authorization/authorization.service';
import { UserService } from '../user-service/user.service';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  constructor(
    private httpClient: HttpClient,
    private userService: UserService,
    private authorizationService: AuthorizationService,
  ) { }

  updateSkills(skillUpdateRequest: ModificationRequest<Skill>) {
    const options = {
      headers: new HttpHeaders()
        .append('Authorization', `Bearer ${this.authorizationService.getAccessToken()}`),
    };
    return this.httpClient.post(
      `${environment.host}/skills/update`,
      {
        accountId: this.userService.getCurrentUserId(),
        ...skillUpdateRequest
      },
      options
    )
  }
}
