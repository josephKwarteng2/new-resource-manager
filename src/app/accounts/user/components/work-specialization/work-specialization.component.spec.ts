import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkSpecializationComponent } from './work-specialization.component';

describe('WorkSpecializationComponent', () => {
  let component: WorkSpecializationComponent;
  let fixture: ComponentFixture<WorkSpecializationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkSpecializationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkSpecializationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
