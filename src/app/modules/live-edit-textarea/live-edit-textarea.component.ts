import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { AuthorizationService } from 'src/app/service/authorization/authorization.service';

@Component({
  selector: 'app-live-edit-textarea',
  templateUrl: './live-edit-textarea.component.html',
  styleUrls: ['./live-edit-textarea.component.css']
})
export class LiveEditTextareaComponent implements OnInit {

  isEdit = false;
  @Input()
  value: any;
  @Input()
  placeholder: any;
  @Output()
  onSave: EventEmitter<any> = new EventEmitter()
  newValue: any;

  constructor(
    private eRef: ElementRef,
    private authorizationService: AuthorizationService
  ) { }

  ngOnInit(): void {
    this.newValue = this.value;
  }

  save(): void {
    this.onSave.emit(this.newValue);
  }

  onNameChange(model: string) {
    console.log('asdqwe');
    this.newValue = model;
  }

  decline(asd: any): void {
    this.isEdit = false;
  }

  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if (this.eRef.nativeElement.contains(event.target)) {
      this.isEdit = true;
    } else {
      if (this.isEdit) {
        this.save();
        this.isEdit = false;
      }
    }
  }

  isEnabled() {
    return this.authorizationService.isUserLoggedIn();
  }

}
