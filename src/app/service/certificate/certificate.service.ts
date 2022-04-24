import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Certificate, ModificationRequest } from 'src/app/types/types';
import { environment } from 'src/environments/environment';
import { AuthorizationService } from '../authorization/authorization.service';
import { UserService } from '../user-service/user.service';

@Injectable({
  providedIn: 'root'
})
export class CertificateService {

  constructor(
    private httpClient: HttpClient,
    private userService: UserService,
    private authorizationService: AuthorizationService
  ) { }

  updateCertificates(certificateUpdateRequest: ModificationRequest<Certificate>): Observable<Certificate[]> {
    const options = {
      headers: new HttpHeaders()
        .append('Authorization', `Bearer ${this.authorizationService.getAccessToken()}`),
    };
    return this.httpClient.post<Certificate[]>(
      `${environment.host}/certificate/update`,
      {
        accountId: this.userService.getCurrentUserId(),
        ...certificateUpdateRequest
      },
      options
    )
  }
}
