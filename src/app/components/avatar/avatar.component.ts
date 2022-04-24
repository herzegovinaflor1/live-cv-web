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
export class AvatarComponent implements OnInit {

  @Input()
  fullName: any;
  @Input()
  currentTitle: any;
  @Input()
  photo: any;

  fileName = '';

  constructor(
    private userService: UserService,
    private fileProcessorService: FileProcessorService,
    private avatarService: AvatarService
  ) { }

  ngOnInit(): void {
    this.fileProcessorService.getCurrentUserPhoto()
      .subscribe((data: any) => {
        const reader = new FileReader();
        reader.onload = (e: any) => this.photo = e.target.result;
        reader.readAsDataURL(new Blob([data]));
      });
  }

  downloadCv() {
    this.fileProcessorService.downloadCVFile()
      .subscribe((data: any) => {
        const blob = new Blob([data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        window.open(url);
      });
  }

  updateCurrentTitle(newTitle: string) {
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
      this.fileName = file.name;
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
