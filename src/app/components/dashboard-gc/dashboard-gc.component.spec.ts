import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardGCComponent } from './dashboard-gc.component';

describe('DashboardGCComponent', () => {
  let component: DashboardGCComponent;
  let fixture: ComponentFixture<DashboardGCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardGCComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardGCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
