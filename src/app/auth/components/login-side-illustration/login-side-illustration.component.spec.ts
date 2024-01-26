import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginSideIllustrationComponent } from './login-side-illustration.component';

describe('LoginSideIllustrationComponent', () => {
  let component: LoginSideIllustrationComponent;
  let fixture: ComponentFixture<LoginSideIllustrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginSideIllustrationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginSideIllustrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
