import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginCaisseComponent } from './login-caisse.component';

describe('LoginCaisseComponent', () => {
  let component: LoginCaisseComponent;
  let fixture: ComponentFixture<LoginCaisseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginCaisseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginCaisseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
