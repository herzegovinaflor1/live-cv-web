import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorizationService } from 'src/app/service/authorization/authorization.service';
import { UserService } from '../../service/user-service/user.service';

@Component({
  selector: 'app-cv-container',
  templateUrl: './cv-container.component.html',
  styleUrls: ['./cv-container.component.css']
})
export class CvContainerComponent implements OnInit {

  response: any;

  constructor(
    private userService: UserService,
    private authorizationService: AuthorizationService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    if (this.authorizationService.isUserLoggedIn()) {
      this.userService.getUser(this.route.snapshot.params['user_id'])
        .subscribe(res => this.response = res);
    } else {
      this.router.navigate([`/`])
    }
  }

}
