import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Servicios1 } from './servicios-1';

describe('Servicios1', () => {
  let component: Servicios1;
  let fixture: ComponentFixture<Servicios1>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Servicios1]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Servicios1);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
