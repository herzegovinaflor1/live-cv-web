import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InvalidToDateFormat } from 'src/app/exception/exceptions';
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
    this.validateModificationRequest(experienceUpdateRequest);
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

  private validateModificationRequest(request: ModificationRequest<Experience>): void {
    const add: Experience[] = request.add;
    const update: Experience[] = request.update;

    // this.validateDateTo(add);
    // this.validateDateTo(update);
  }

  validateDateTo(experiences: Experience[]): boolean {
    const experioencesWithNullOrEmptyDateTo = experiences
      .filter(experience => !!experience.to)
      .length;
    if (experioencesWithNullOrEmptyDateTo > 1) {
      throw new InvalidToDateFormat('Unvalid number of present experiences');
    }
    return true;
  }
}
