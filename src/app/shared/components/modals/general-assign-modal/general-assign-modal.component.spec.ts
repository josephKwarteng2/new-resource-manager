import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralAssignModalComponent } from './general-assign-modal.component';

describe('GeneralAssignModalComponent', () => {
  let component: GeneralAssignModalComponent;
  let fixture: ComponentFixture<GeneralAssignModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneralAssignModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GeneralAssignModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
