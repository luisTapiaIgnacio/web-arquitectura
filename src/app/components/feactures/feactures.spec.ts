import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Feactures } from './feactures';

describe('Feactures', () => {
  let component: Feactures;
  let fixture: ComponentFixture<Feactures>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Feactures]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Feactures);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
