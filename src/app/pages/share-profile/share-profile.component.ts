import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthorizationService } from 'src/app/service/authorization/authorization.service';
import { UserService } from 'src/app/service/user-service/user.service';

@Component({
  selector: 'app-share-profile',
  templateUrl: './share-profile.component.html',
  styleUrls: ['./share-profile.component.css']
})
export class ShareProfileComponent implements OnInit {

  response: any;

  constructor(
    private userService: UserService,
    private authorizationService: AuthorizationService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.authorizationService.disable();
    const token = this.route.snapshot.queryParamMap.get('token');
    if (token) {
      this.userService.getUserByToken(token)
        .subscribe(res => {
          this.response = res;
        });
    }
  }

}
