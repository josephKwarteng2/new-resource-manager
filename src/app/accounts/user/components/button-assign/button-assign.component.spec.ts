import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonAssignComponent } from './button-assign.component';

describe('ButtonAssignComponent', () => {
  let component: ButtonAssignComponent;
  let fixture: ComponentFixture<ButtonAssignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonAssignComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ButtonAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
