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
  fullName: any;
  @Input()
  location: any;
  @Input()
  email: any;
  @Input()
  phone: any;
  @Input()
  isShareMode: boolean = false;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  updateFullName(newFullName: any) {
    const changeRequest: SummaryDataChangeRequest = {
      newValue: newFullName,
      oldValue: this.fullName,
      userFiled: "FULL_NAME"
    }
    this.fullName = newFullName;
    this.userService.updateUserDataByField(changeRequest)
      .subscribe();
  }

  updateLocation(newLocation: any) {
    const changeRequest: SummaryDataChangeRequest = {
      newValue: newLocation,
      oldValue: this.location,
      userFiled: "LOCATION"
    }
    this.location = newLocation;
    this.userService.updateUserDataByField(changeRequest)
      .subscribe();
  }

  updateEmail(newEmail: any) {
    const changeRequest: SummaryDataChangeRequest = {
      newValue: newEmail,
      oldValue: this.email,
      userFiled: "EMAIL"
    }
    this.email = newEmail;
    this.userService.updateUserDataByField(changeRequest)
      .subscribe();
  }

  updatePhone(newPhone: any) {
    const changeRequest: SummaryDataChangeRequest = {
      newValue: newPhone,
      oldValue: this.phone,
      userFiled: "PHONE"
    }
    this.phone = newPhone;
    this.userService.updateUserDataByField(changeRequest)
      .subscribe();
  }

}
