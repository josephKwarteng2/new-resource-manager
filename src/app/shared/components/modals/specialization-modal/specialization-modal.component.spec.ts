import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecializationModalComponent } from './specialization-modal.component';

describe('SpecializationModalComponent', () => {
  let component: SpecializationModalComponent;
  let fixture: ComponentFixture<SpecializationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecializationModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpecializationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
