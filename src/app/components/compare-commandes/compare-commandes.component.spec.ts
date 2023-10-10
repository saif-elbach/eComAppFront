import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareCommandesComponent } from './compare-commandes.component';

describe('CompareCommandesComponent', () => {
  let component: CompareCommandesComponent;
  let fixture: ComponentFixture<CompareCommandesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompareCommandesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompareCommandesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
