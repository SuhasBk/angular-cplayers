import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Staticml1Component } from './staticml1.component';

describe('Staticml1Component', () => {
  let component: Staticml1Component;
  let fixture: ComponentFixture<Staticml1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Staticml1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Staticml1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
