import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivedClientsListComponent } from './archived-clients-list.component';

describe('ArchivedClientsListComponent', () => {
  let component: ArchivedClientsListComponent;
  let fixture: ComponentFixture<ArchivedClientsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArchivedClientsListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArchivedClientsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
