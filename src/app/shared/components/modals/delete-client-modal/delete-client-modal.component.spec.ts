import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteClientModalComponent } from './delete-client-modal.component';

describe('DeleteClientModalComponent', () => {
  let component: DeleteClientModalComponent;
  let fixture: ComponentFixture<DeleteClientModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteClientModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteClientModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
