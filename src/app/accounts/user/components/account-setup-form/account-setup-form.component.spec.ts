import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountSetupFormComponent } from './account-setup-form.component';

describe('AccountSetupFormComponent', () => {
  let component: AccountSetupFormComponent;
  let fixture: ComponentFixture<AccountSetupFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountSetupFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccountSetupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
