import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from 'src/app/service/authorization/authorization.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: any = "";
  password: any = "";

  constructor(
    private authorizationService: AuthorizationService
  ) { }

  ngOnInit(): void {
  }

  logIn() {
    this.authorizationService.authenticate(this.username, this.password);
  }

}
