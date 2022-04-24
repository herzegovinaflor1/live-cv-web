import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { AuthorizationService } from 'src/app/service/authorization/authorization.service';

@Component({
  selector: 'app-live-edit-input',
  templateUrl: './live-edit-input.component.html',
  styleUrls: ['./live-edit-input.component.css']
})
export class LiveEditInputComponent implements OnInit {

  @Input()
  value: string = "";
  @Input()
  placeholder: string = "";
  @Input()
  isValid: (value: string) => boolean = () => true;

  @Output()
  onSave: EventEmitter<any> = new EventEmitter()
  
  newValue: string = "";
  isEdit:boolean = false;

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
    this.newValue = model;
  }

  decline(): void {
    this.isEdit = false;
  }

  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if (this.eRef.nativeElement.contains(event.target)) {
      this.isEdit = true;
    } else {
      if (this.isEdit && this.isValid(this.newValue)) {
        this.save();
        this.isEdit = false;
      }
    }
  }

  isEnabled() {
    return this.authorizationService.isUserLoggedIn();
  }

}
