import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveEditTextareaComponent } from './live-edit-textarea.component';

describe('LiveEditComponent', () => {
  let component: LiveEditTextareaComponent;
  let fixture: ComponentFixture<LiveEditTextareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiveEditTextareaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveEditTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
