import { Component, Input, OnInit } from '@angular/core';
import { SummaryDataChangeRequest } from 'src/app/types/types';
import { UserService } from '../../service/user-service/user.service';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css']
})
export class PersonalInfoComponent implements OnInit {

  @Input()
  fullName: string = "";
  @Input()
  location: string = "";
  @Input()
  email: string = "";
  @Input()
  phone: string = "";
  @Input()
  isShareMode: boolean = false;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  updateFullName(newFullName: string) {
    const changeRequest: SummaryDataChangeRequest = {
      newValue: newFullName,
      oldValue: this.fullName,
      userFiled: "FULL_NAME"
    }
    this.fullName = newFullName;
    this.userService.updateUserDataByField(changeRequest)
      .subscribe();
  }

  updateLocation(newLocation: string) {
    const changeRequest: SummaryDataChangeRequest = {
      newValue: newLocation,
      oldValue: this.location,
      userFiled: "LOCATION"
    }
    this.location = newLocation;
    this.userService.updateUserDataByField(changeRequest)
      .subscribe();
  }

  updateEmail(newEmail: string) {
    const changeRequest: SummaryDataChangeRequest = {
      newValue: newEmail,
      oldValue: this.email,
      userFiled: "EMAIL"
    }
    this.email = newEmail;
    this.userService.updateUserDataByField(changeRequest)
      .subscribe();
  }

  updatePhone(newPhone: string) {
    const changeRequest: SummaryDataChangeRequest = {
      newValue: newPhone,
      oldValue: this.phone,
      userFiled: "PHONE"
    }
    this.phone = newPhone;
    this.userService.updateUserDataByField(changeRequest)
      .subscribe();
  }

  isValidEmailValid(email: string): boolean {
    if (email.length === 0) {
      return true;
    }
    return this.userService.isEmailValid(email);
  }

}
