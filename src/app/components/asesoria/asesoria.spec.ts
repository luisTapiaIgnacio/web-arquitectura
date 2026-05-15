import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Asesoria } from './asesoria';

describe('Asesoria', () => {
  let component: Asesoria;
  let fixture: ComponentFixture<Asesoria>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Asesoria]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Asesoria);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
