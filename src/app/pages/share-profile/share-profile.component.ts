import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthorizationService } from 'src/app/service/authorization/authorization.service';
import { FileProcessorService } from 'src/app/service/file-processor/file-processor.service';
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
    private route: ActivatedRoute,
    private fileProcessorService: FileProcessorService
  ) { }

  ngOnInit(): void {
    this.authorizationService.disable();
    const token = this.route.snapshot.queryParamMap.get('token');
    if (token) {
      this.userService.getUserByToken(token)
        .subscribe(res => {
          this.setPhoto(res);
          this.response = res
        });
    }
  }

  private setPhoto(userResp: any) {
    this.fileProcessorService.getCurrentUserPhoto()
      .subscribe((data: any) => {
        const reader = new FileReader();
        reader.onload = (e: any) => userResp.photo = e.target.result;
        reader.readAsDataURL(new Blob([data]));
      });
  }

}
