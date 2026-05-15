import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasServicios } from './mas-servicios';

describe('MasServicios', () => {
  let component: MasServicios;
  let fixture: ComponentFixture<MasServicios>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MasServicios]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MasServicios);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
