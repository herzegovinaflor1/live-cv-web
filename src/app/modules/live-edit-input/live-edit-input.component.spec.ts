import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveEditInputComponent } from './live-edit-input.component';

describe('LiveEditComponent', () => {
  let component: LiveEditInputComponent;
  let fixture: ComponentFixture<LiveEditInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiveEditInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveEditInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
