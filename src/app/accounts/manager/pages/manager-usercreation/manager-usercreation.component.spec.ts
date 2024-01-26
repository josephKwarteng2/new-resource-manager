import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerUsercreationComponent } from './manager-usercreation.component';

describe('ManagerUsercreationComponent', () => {
  let component: ManagerUsercreationComponent;
  let fixture: ComponentFixture<ManagerUsercreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerUsercreationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManagerUsercreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
