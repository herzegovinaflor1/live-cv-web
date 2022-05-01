import { Component, Input, OnInit } from '@angular/core';
import { AvatarService } from 'src/app/service/avatar-service/avatar.service';
import { FileProcessorService } from 'src/app/service/file-processor/file-processor.service';
import { SummaryDataChangeRequest } from 'src/app/types/types';
import { UserService } from '../../service/user-service/user.service';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css']
})
export class AvatarComponent {

  @Input()
  fullName: any;
  @Input()
  currentTitle: any;
  @Input()
  photo: any;

  constructor(
    private userService: UserService,
    private fileProcessorService: FileProcessorService,
    private avatarService: AvatarService
  ) { }

  downloadCv() {
    this.fileProcessorService.downloadCVFile()
      .subscribe((data: any) => {
        const blob = new Blob([data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        window.open(url);
      });
  }

  updateCurrentTitle(newTitle: any) {
    const changeRequest: SummaryDataChangeRequest = {
      newValue: newTitle,
      oldValue: this.currentTitle,
      userFiled: "CURRENT_TITLE"
    }
    this.currentTitle = newTitle;
    this.userService.updateUserDataByField(changeRequest)
      .subscribe();
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      const formData = new FormData();

      formData.append("photo", file);
      formData.append("accountId", this.userService.getCurrentUserId());
      this.avatarService.updatePhoto(formData)
        .subscribe(
          () => { }
        );
    }
  }

}
