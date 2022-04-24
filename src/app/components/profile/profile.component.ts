import { Component, Input, OnInit } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { ShareLink, SummaryDataChangeRequest } from 'src/app/types/types';
import { UserService } from '../../service/user-service/user.service';
import { AuthorizationService } from 'src/app/service/authorization/authorization.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @Input()
  summary: any;
  @Input()
  link: string | null = null;

  constructor(
    private userService: UserService,
    private authorizationService: AuthorizationService,
    private clipboard: Clipboard
  ) { }

  ngOnInit(): void { }

  updateSummary(newSummary: string) {
    const changeRequest: SummaryDataChangeRequest = {
      newValue: newSummary,
      oldValue: this.summary,
      userFiled: "SUMMARY"
    }
    this.summary = newSummary;
    this.userService.updateUserDataByField(changeRequest)
      .subscribe()
  }

  generateShareLink() {
    this.userService.generateShareLink("GENERATE")
      .subscribe((link: ShareLink) => {
        this.link = link.value;
      })
  }

  copyShareLink() {
    if (this.link) {
      const shareLink = `${location.origin}/share?token=${this.link}`
      this.clipboard.copy(shareLink);
    }
  }

  deleteShareLink() {
    this.userService.generateShareLink("DELETE")
      .subscribe(() => {
        this.link = null;
      })
  }

  isEnabled() {
    return this.authorizationService.isUserLoggedIn();
  }

}
