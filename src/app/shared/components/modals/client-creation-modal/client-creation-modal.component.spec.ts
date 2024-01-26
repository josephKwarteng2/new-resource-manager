import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientCreationModalComponent } from './client-creation-modal.component';

describe('ClientCreationModalComponent', () => {
  let component: ClientCreationModalComponent;
  let fixture: ComponentFixture<ClientCreationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientCreationModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientCreationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
