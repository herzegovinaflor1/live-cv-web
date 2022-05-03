import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorizationService } from 'src/app/service/authorization/authorization.service';
import { FileProcessorService } from 'src/app/service/file-processor/file-processor.service';
import { UserService } from '../../service/user-service/user.service';

@Component({
  selector: 'app-cv-container',
  templateUrl: './cv-container.component.html',
  styleUrls: ['./cv-container.component.css']
})
export class CvContainerComponent implements OnInit {

  response: any;
  isDataLoaded: boolean = false;

  constructor(
    private userService: UserService,
    private authorizationService: AuthorizationService,
    private route: ActivatedRoute,
    private router: Router,
    private fileProcessorService: FileProcessorService
  ) { }

  ngOnInit(): void {
    if (this.authorizationService.isUserLoggedIn()) {
      this.userService.getUser(this.route.snapshot.params['user_id'])
        .subscribe(res => {
          this.setPhoto(res);
          this.response = res
        });
    } else {
      this.router.navigate([`/`])
    }
  }

  private setPhoto(userResp: any) {
    this.fileProcessorService.getCurrentUserPhoto()
      .subscribe((data: any) => {
        const reader = new FileReader();
        reader.onload = (e: any) => userResp.photo = e.target.result;
        reader.readAsDataURL(new Blob([data]));
        
        this.isDataLoaded = true;
      });
  }

}
