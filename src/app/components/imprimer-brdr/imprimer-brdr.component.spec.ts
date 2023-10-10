import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImprimerBrdrComponent } from './imprimer-brdr.component';

describe('ImprimerBrdrComponent', () => {
  let component: ImprimerBrdrComponent;
  let fixture: ComponentFixture<ImprimerBrdrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImprimerBrdrComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImprimerBrdrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
