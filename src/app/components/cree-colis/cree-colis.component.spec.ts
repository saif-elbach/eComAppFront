import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreeColisComponent } from './cree-colis.component';

describe('CreeColisComponent', () => {
  let component: CreeColisComponent;
  let fixture: ComponentFixture<CreeColisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreeColisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreeColisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
