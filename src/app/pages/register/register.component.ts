import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from 'src/app/service/authorization/authorization.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username: any = "";
  password: any = "";

  constructor(
    private authorizationService: AuthorizationService
  ) { }

  ngOnInit(): void {
  }

  register() {
    this.authorizationService.register(this.username, this.password);
  }

}
