import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchooluserComponent } from './schooluser.component';

describe('SchooluserComponent', () => {
  let component: SchooluserComponent;
  let fixture: ComponentFixture<SchooluserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchooluserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchooluserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
