import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCreationModalComponent } from './project-creation-modal.component';

describe('ProjectCreationModalComponent', () => {
  let component: ProjectCreationModalComponent;
  let fixture: ComponentFixture<ProjectCreationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectCreationModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjectCreationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
