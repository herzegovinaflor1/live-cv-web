import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { AuthorizationService } from 'src/app/service/authorization/authorization.service';

@Component({
  selector: 'security-restricted',
  templateUrl: './security-restricted.component.html',
  styleUrls: ['./security-restricted.component.css']
})
export class SecurityRestrictedComponent implements OnInit {

  @Input()
  headerTemplate!: TemplateRef<any>;

  constructor(
    private authorizationService: AuthorizationService
  ) { }

  ngOnInit(): void {
  }

  isEnabled() {
    return this.authorizationService.isUserLoggedIn();
  }

}
