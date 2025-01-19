import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuitarCardComponent } from './guitar-card.component';

describe('GuitarCardComponent', () => {
  let component: GuitarCardComponent;
  let fixture: ComponentFixture<GuitarCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ GuitarCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuitarCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
