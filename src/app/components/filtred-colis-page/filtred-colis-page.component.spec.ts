import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltredColisPageComponent } from './filtred-colis-page.component';

describe('FiltredColisPageComponent', () => {
  let component: FiltredColisPageComponent;
  let fixture: ComponentFixture<FiltredColisPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltredColisPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiltredColisPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
